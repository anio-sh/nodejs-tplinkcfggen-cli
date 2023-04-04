const parseACLTargetNotation = require("../util/parseACLTargetNotation.js")
const {mapProtocolNameToInteger} = require("../util/map/protocol.js")

module.exports = function(context, normalized_rule) {
	let parts = []

	parts.push(`access-list ip ${context.acl_id} rule ${context.rule_id} ${normalized_rule.action}`)

	// handle logging parameter
	if (normalized_rule.logging) {
		parts.push(`logging enable`)
	} else {
		// is required!
		parts.push(`logging disable`)
	}

	const source = parseACLTargetNotation(normalized_rule.source)
	const destination = parseACLTargetNotation(normalized_rule.destination)

	// add source ip (if source ip isn't "any")
	if (!(source.ip === "0.0.0.0" && source.subnet_mask === "0.0.0.0")) {
		parts.push(`sip ${source.ip} sip-mask ${source.subnet_mask}`)
	}

	// add destination ip (if destination ip isn't "any")
	if (!(destination.ip === "0.0.0.0" && destination.subnet_mask === "0.0.0.0")) {
		parts.push(`dip ${destination.ip} dip-mask ${destination.subnet_mask}`)
	}

	// handle protocol
	if (normalized_rule.protocol !== "none") {
		parts.push(`protocol ${mapProtocolNameToInteger(normalized_rule.protocol)}`)
	}

	// handle destination port
	if (Array.isArray(destination.ports)) {
		parts.push(`d-port ${destination.ports[0]} d-port-mask ffff`)
	}

	// handle source port
	if (Array.isArray(source.ports)) {
		parts.push(`s-port ${source.ports[0]} s-port-mask ffff`)
	}

	return parts.join(" ")
}
