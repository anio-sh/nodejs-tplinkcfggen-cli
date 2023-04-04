const normalizeCompressedFormat = require("./acl/normalizeCompressedFormat.js")
const rule_expander = require("./acl/rule_expander/index.js")
const convertSingleACLRuleToString = require("./acl/convertSingleACLRuleToString.js")

module.exports = function(config) {
	let rules = config.rules.map(normalizeCompressedFormat)

	rules = rule_expander(rules)

	console.log(rules)
}
