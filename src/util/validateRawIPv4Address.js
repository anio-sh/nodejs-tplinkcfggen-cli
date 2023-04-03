const isString = require("./isString.js")
const isNumericString = require("./isNumericString.js")

module.exports = function(ip_addr_str) {
	if (!isString(ip_addr_str)) {
		throw new Error(`validateRawIPv4Format called on non-string variable.`)
	}

	const octets = ip_addr_str.split(".")

	if (octets.length !== 4) {
		throw new Error(`Invalid number of octets in IPv4Address '${ip_addr_str}'.`)
	}

	for (const octet of octets) {
		if (!isNumericString(octet)) {
			throw new Error(`Found non-numeric octect '${octet}' in IPv4Address '${ip_addr_str}'.`)
		}

		const octet_value = parseInt(octet, 10)

		if (octet_value > 255) {
			throw new Error(`Octet value '${octet_value}' is out of range in IPv4Address '${ip_addr_str}'.`)
		}
	}
}
