/**
 * Counts the leading bits of a subnet mask:
 * 
 * 255.255.255.0   -> 24
 * 255.255.255.255 -> 32
 */
const isString = require("./isString.js")

module.exports = function(subnet_mask_str) {
	if (!isString(subnet_mask_str)) {
		throw new Error(`countLeadingSubMaskBits called on non-string variable.`)
	}

	const octets_binary_str = subnet_mask_str.split(".").map(octet => {
		return parseInt(octet, 10).toString(2)
	}).join("")


	return octets_binary_str.split("").filter(ch => {
		return ch === "1"
	}).length
}
