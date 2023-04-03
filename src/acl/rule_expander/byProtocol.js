const parseACLTargetNotation = require("../../util/parseACLTargetNotation.js")
const arrayify = require("../../util/arrayify.js")

module.exports = function(rules) {
	let ret = []

	for (const rule of rules) {
		const protocols = arrayify(rule.protocol)

		if (protocols.length === 1) {
			ret.push({
				...rule,
				protocol: protocols[0]
			})
		} else {
			for (let i = 0; i < protocols.length; ++i) {
				ret.push({
					...rule,
					protocol: protocols[i]
				})
			}
		}
	}

	return ret
}
