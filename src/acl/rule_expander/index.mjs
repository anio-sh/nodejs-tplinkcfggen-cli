import expandRulesBySourceAndDestination from "./bySourceAndDestination.mjs"
import expandRulesByDestinationPorts from "./byDestinationPorts.mjs"
import expandRulesByProtocol from "./byProtocol.mjs"

export default function(rules) {
	let expanded_rules = expandRulesBySourceAndDestination(rules)

	expanded_rules = expandRulesByDestinationPorts(expanded_rules)

	return expandRulesByProtocol(expanded_rules)
}
