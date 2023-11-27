export default function({context, normalized_rule, source, destination}) {
	let incompatible_protocol_by_src = false
	let incompatible_protocol_by_dst = false

	if (source.ports !== "any") {
		if (source.ports.length > 1) {
			throw new Error(`Cannot specify multiple source ports for this function. This is an internal error/bug!`)
		}

		if (normalized_rule.protocol !== "udp" && normalized_rule.protocol !== "tcp") {
			incompatible_protocol_by_src = true
		}
	}

	if (destination.ports !== "any") {
		if (destination.ports.length > 1) {
			throw new Error(`Cannot specify multiple destination ports for this function. This is an internal error/bug!`)
		}

		if (normalized_rule.protocol !== "udp" && normalized_rule.protocol !== "tcp") {
			incompatible_protocol_by_dst = true
		}
	}

	if (incompatible_protocol_by_src && incompatible_protocol_by_dst) {
		throw new Error(
			`Cannot specify source and destination port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	} else if (incompatible_protocol_by_src) {
		throw new Error(
			`Cannot specify source port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	} else if (incompatible_protocol_by_dst) {
		throw new Error(
			`Cannot specify destination port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	}
}
