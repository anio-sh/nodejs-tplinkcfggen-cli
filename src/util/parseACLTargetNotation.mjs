/**
 * Formats:
 * 
 * 10.0.0.1       -> assumed mask 255.255.255.255
 * 10.0.0.1/24    -> mask set by slash notation (255.255.255.0)
 * 
 * 10.0.0.1:80    -> assumed mask 255.255.255.255 port 80
 * 10.0.0.1/24:80 -> assumed mask 255.255.255.0 port 80
 */
import createSubnetMask from "./createSubnetMask.mjs"
import validateIP from "./validateRawIPv4Address.mjs"
import isNumericString from "./isNumericString.mjs"
import {mapPortNameToInteger} from "./map/port.mjs"

function parseIPWithSlashNotation(ip_addr_str) {
	const is_any_ip_addr = ip_addr_str.slice(0, 3) === "any"

	let ip = is_any_ip_addr ? "0.0.0.0" : ip_addr_str
	let subnet_mask = is_any_ip_addr ? "0.0.0.0" : "255.255.255.255"

	// check for slash "/" notation
	if (ip_addr_str.indexOf("/") >= 0) {
		// throw error if ip starts with "any"
		if (is_any_ip_addr) {
			throw new Error(`Cannot specify subnet mask for 'any' ip address.`)
		}

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

export default function(ip_addr_str) {
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
