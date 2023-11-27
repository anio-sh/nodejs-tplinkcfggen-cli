export default function(device_config) {
	if (!("vlan" in device_config)) {
		return ""
	}

	let str = `\n`

	// declare vlans
	for (const vlan of device_config.vlan) {
		str += `vlan ${vlan.id}\n`
		str += ` name "${vlan.label}"\n\n`
	}

	// declare vlan interfaces
	for (const vlan of device_config.vlan) {
		if (!("interface" in vlan)) continue

		str += `interface vlan ${vlan.id}\n`

		if (vlan.interface.type === "static") {
			str += `  ip address ${vlan.interface.ip} ${vlan.interface.mask}\n`
			str += `  description "static_interface"\n`
		} else if (vlan.interface.type === "dhcp") {
			str += `  ip address-alloc dhcp\n`
			str += `  description "dhcp_interface"\n`
		} else {
			throw new Error(`Unknown interface type '${vlan.interface.type}'`)
		}

		str += `  no ipv6 enable\n\n`
	}

	return str
}
