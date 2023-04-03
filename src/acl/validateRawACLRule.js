const arrayify = require("../util/arrayify.js")
const parseACLTargetNotation = require("../util/parseACLTargetNotation.js")
const {mapProtocolNameToInteger} = require("../util/map/protocol.js")

module.exports = function(rule) {
	const source = parseACLTargetNotation(rule.source)
	const destination = parseACLTargetNotation(rule.destination)

	const source_ports = arrayify(source.ports)
	const destination_ports = arrayify(destination.ports)

	if (source_ports.length > 1) {
		throw new Error(
			`Cannot have more than one source port (got ${source_ports.length}): '${rule.source}'.`
		)
	} else if (destination_ports.length > 1) {
		throw new Error(
			`Cannot have more than one destination port (got ${destination_ports.length}): '${rule.destination}'.`
		)
	}

	const source_port_set = source_ports[0] !== "any"
	const destination_port_set = destination_ports[0] !== "any"

	let protocol_no = null

	const protocols_with_ports = [6, 17] /* tcp, udp */

	if ("protocol" in rule) {
		protocol_no = mapProtocolNameToInteger(rule.protocol)
	}

	if (source_port_set) {
		if (protocol_no === null) {
			throw new Error(
				`Cannot have a source port (${source_ports[0]}) without matching protocol (protocol given: none).`
			)
		} else if (!protocols_with_ports.includes(protocol_no)) {
			throw new Error(
				`Cannot have a source port (${source_ports[0]}) without matching protocol (protocol given: ${rule.protocol}).`
			)
		}
	} else if (destination_port_set) {
		if (protocol_no === null) {
			throw new Error(
				`Cannot have a destination port (${destination_ports[0]}) without matching protocol (protocol given: none).`
			)
		} else if (!protocols_with_ports.includes(protocol_no)) {
			throw new Error(
				`Cannot have a destination port (${destination_ports[0]}) without matching protocol (protocol given: ${rule.protocol}).`
			)
		}
	}

	if (!("acl_id" in rule)) {
		throw new Error(`acl_id is missing.`)
	} else if (!("rule_id" in rule)) {
		throw new Error(`rule_id is missing.`)
	} else if (!("action" in rule)) {
		throw new Error(`action is missing.`)
	}
}
