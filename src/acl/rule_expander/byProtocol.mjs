import parseACLTargetNotation from "../../util/parseACLTargetNotation.mjs"
import arrayify from "../../util/arrayify.mjs"

export default function(rules) {
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
