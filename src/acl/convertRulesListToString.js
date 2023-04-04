const normalizeCompressedFormat = require("./normalizeCompressedFormat.js")
const rule_expander = require("./rule_expander/index.js")
const convertSingleACLRuleToString = require("./convertSingleACLRuleToString.js")

module.exports = function(acl) {
	let parts = []
	let rules = acl.rules.map(normalizeCompressedFormat)

	rules = rule_expander(rules)

	let rule_id = 1000

	for (const rule of rules) {
		parts.push(
			convertSingleACLRuleToString({
				acl_id: acl.id,
				rule_id
			}, rule)
		)

		rule_id += 10
	}

	return parts.join("\n")
}
