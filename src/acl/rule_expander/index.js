const expandRulesBySourceAndDestination = require("./bySourceAndDestination.js")
const expandRulesByDestinationPorts = require("./byDestinationPorts.js")
const expandRulesByProtocol = require("./byProtocol.js")

module.exports = function(rules) {
	let expanded_rules = expandRulesBySourceAndDestination(rules)

	expanded_rules = expandRulesByDestinationPorts(expanded_rules)

	return expandRulesByProtocol(expanded_rules)
}
