/**
 * Formats:
 * 
 * 10.0.0.1       -> assumed mask 255.255.255.255
 * 10.0.0.1/24    -> mask set by slash notation (255.255.255.0)
 * 
 * 10.0.0.1:80    -> assumed mask 255.255.255.255 port 80
 * 10.0.0.1/24:80 -> assumed mask 255.255.255.0 port 80
 */
const createSubnetMask = require("./createSubnetMask.js")
const validateIP = require("./validateRawIPv4Address.js")
const isNumericString = require("./isNumericString.js")
const {mapPortNameToInteger} = require("./map/port.js")

function parseIPWithSlashNotation(ip_addr_str) {
	let ip = ip_addr_str
	let subnet_mask = "255.255.255.255"

	// check for slash "/" notation
	if (ip_addr_str.indexOf("/") >= 0) {
		let tmp = ip_addr_str.split("/")

		ip = tmp[0]
		subnet_mask = createSubnetMask(parseInt(tmp[1], 10))
	}

	validateIP(ip)

	return {
		ip,
		subnet_mask
	}
}

module.exports = function(ip_addr_str) {
	if (ip_addr_str.trim() === "" || ip_addr_str === "any") {
		return {
			"ip": "0.0.0.0",
			"subnet_mask": "0.0.0.0",
			"ports": "any"
		}
	}

	const port_map = {
		"ssh": 22,
		"dhcp.server": 67,
		"dhcp.client": 68,
		"http": 80,
		"https": 443
	}

	let ip_with_possible_slash_notation = ip_addr_str
	let ports = "any"

	// check for dot ":" notation (ports)
	if (ip_addr_str.indexOf(":") >= 0) {
		let tmp = ip_addr_str.split(":")

		ip_with_possible_slash_notation = tmp[0]

		// ip could still be "any" at this point
		if (ip_with_possible_slash_notation === "any") {
			ip_with_possible_slash_notation = "0.0.0.0"
		}

		// ports could be "any", handle this case here
		if (tmp[1] === "any") {
			ports = "any"
		} else {
			// map ports
			const mapped_ports = tmp[1].split(",").map(mapPortNameToInteger)

			ports = []

			// go through ports and destructure multiple ports
			// for example: ftp returns [20,21] instead of a single port
			for (let port of mapped_ports) {
				if (Array.isArray(port)) {
					ports.push(...port)
				} else {
					ports.push(port)
				}
			}
		}
	}

	return {
		...parseIPWithSlashNotation(
			ip_with_possible_slash_notation
		),
		ports
	}
}
