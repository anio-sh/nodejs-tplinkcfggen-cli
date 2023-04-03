const parseACLTargetNotation = require("../../util/parseACLTargetNotation.js")
const countLeadingSubMaskBits = require("../../util/countLeadingSubMaskBits.js")
const {mapIntegerToPortName} = require("../../util/map/port.js")

module.exports = function(rules) {
	let ret = []

	for (const rule of rules) {
		const src = parseACLTargetNotation(rule.source)
		const dst = parseACLTargetNotation(rule.destination)

		let more_than_one_src_port = true

		if (src.ports === "any") more_than_one_src_port = false
		if (Array.isArray(src.ports) && src.ports.length === 1) more_than_one_src_port = false

		if (more_than_one_src_port) {
			throw new Error(`Source port can only be 'any' or a single port.`)
		}

		if (dst.ports === "any") {
			ret.push(rule)
		} else if (Array.isArray(dst.ports) && dst.ports.length === 1) {
			ret.push(rule)
		} else if (Array.isArray(dst.ports)) {
			for (let i = 0; i < dst.ports.length; ++i) {
				let leading_bits = countLeadingSubMaskBits(dst.subnet_mask)
				let port = mapIntegerToPortName(dst.ports[i])

				ret.push({
					...rule,
					destination: `${dst.ip}/${leading_bits}:${port}`
				})
			}
		}
	}

	return ret
}
