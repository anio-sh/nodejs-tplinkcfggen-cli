import normalizeCompressedFormat from "./normalizeCompressedFormat.mjs"
import rule_expander from "./rule_expander/index.mjs"
import convertSingleACLRuleToString from "./convertSingleACLRuleToString.mjs"

export default function(acl) {
	let parts = []
	let n_rules = 0
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

		rule_id += 10;
		n_rules++;
	}

	return {
		string: parts.join("\n"),
		n_rules
	}
}
