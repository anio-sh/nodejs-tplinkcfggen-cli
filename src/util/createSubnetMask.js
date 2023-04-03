/**
 * Creates a subnet mask from CIDR slash notation:
 * 
 * createSubnetMask(24) returns "255.255.255.0"
 * 
 * createSubnetMask(32) returns "255.255.255.255" etc.
 */
module.exports = function(n) {
	if (n > 32 || 0 > n) {
		throw new Error(`Invalid value for n=${n} (min=0,max=32)`)
	}

	let mask_str = "1".repeat(n)

	mask_str += "0".repeat(32 - n)

	let chunks = mask_str.match(/.{1,8}/g)

	chunks = chunks.map(chunk => {
		return parseInt(chunk, 2)
	})

	return chunks.join(".")
}
