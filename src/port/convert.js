const isString = require("../util/isString.js")
const compressIntoRanges = require("../util/compressIntoRanges.js")
const uncompressRanges = require("../util/uncompressRanges.js")

module.exports = function(device_config) {
	if (!("port" in device_config)) {
		return ""
	}

	const vlanNameToID = (vlan_name) => {
		if (!("vlan" in device_config)) {
			return vlan_name
		} else if (!isString(vlan_name)) {
			return vlan_name
		}

		for (const tmp of device_config.vlan) {
			if (tmp.label === vlan_name) {
				return tmp.id
			}
		}

		throw new Error(`No such vlan '${vlan_name}'.`)
	}

	let str = ``

	for (const port_name of Object.keys(device_config.port)) {
		str += `\ninterface ${port_name}\n`

		let port_info = device_config.port[port_name]

		// check alias
		if (typeof port_info === "string") {
			port_info = device_config.port[port_info]
		}

		const mode = Array.isArray(port_info.vlan) ? "trunk" : "access"

		if (mode === "trunk") {
			const vlan_ids = port_info.vlan.map(vlanNameToID)

			const vlan_ids_compressed = compressIntoRanges(vlan_ids)
			const vlan_ids_uncompressed = uncompressRanges(vlan_ids_compressed)

			if (JSON.stringify(vlan_ids_uncompressed) !== JSON.stringify(vlan_ids)) {
				throw new Error(`Compressed range does not equal the original range (internal error).`)
			}

			str += `  switchport general allowed vlan ${vlan_ids_compressed} tagged\n`

			if (!("pvid" in port_info)) {
				throw new Error(`pvid required for trunk ports.`)
			}

			str += `  switchport pvid ${vlanNameToID(port_info.pvid)}\n`
		} else {
			str += `  switchport general allowed vlan ${vlanNameToID(port_info.vlan)} untagged\n`
			str += `  switchport pvid ${vlanNameToID(port_info.vlan)}\n`
		}

		// disallow VLAN 1
		str += `  no switchport general allowed vlan 1\n\n`
	}

	return str
}
