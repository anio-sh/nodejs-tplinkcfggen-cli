/**
 * This function normalizes the input consisting of compressed ACL rules.
 * The output is still in compressed format, but normalized (e.g. "tcp", "udp" properties are removed)
 */
const arrayify = require("../util/arrayify.js")

module.exports = function(input) {
	if ("action" in input) {
		// deny and/or permit must not be passed along side 'action'
		if ("deny" in input) {
			throw new Error(`Cannot specify 'deny' along side 'action' at the same time.`)
		} else if ("permit" in input) {
			throw new Error(`Cannot specify 'permit' along side 'action' at the same time.`)
		}
	} else {
		if ("deny" in input && "permit" in input) {
			throw new Error(`Cannot specify 'deny' along side 'permit' at the same time.`)
		}
	}

	if ("protocol" in input) {
		// udp and/or tcp must not be passed along side 'protocol'
		if ("udp" in input) {
			throw new Error(`Cannot specify 'udp' along side 'protocol' at the same time.`)
		} else if ("tcp" in input) {
			throw new Error(`Cannot specify 'tcp' along side 'protocol' at the same time.`)
		}
	}

	if ("logging" in input) {
		// enable_log and/or disable_log must not be passed along side 'logging'
		if ("enable_log" in input) {
			throw new Error(`Cannot specify 'enable_log' along side 'logging' at the same time.`)
		} else if ("disable_log" in input) {
			throw new Error(`Cannot specify 'disable_log' along side 'logging' at the same time.`)
		}
	} else {
		if ("enable_log" in input && "disable_log" in input) {
			throw new Error(`Cannot specify 'enable_log' along side 'disable_log' at the same time.`)
		}
	}

	let normalized = {
		// source+destination remain unchanged
		source: input.source,
		destination: input.destination,
		// default values
		protocol: "none",
		action: "deny",
		logging: false
	}

	let specified_protocols = []

	if ("protocol" in input && input.protocol !== "none") {
		specified_protocols = arrayify(input.protocol)
	} else {
		if ("tcp" in input) {
			specified_protocols.push("tcp")
		}

		if ("udp" in input) {
			specified_protocols.push("udp")
		}
	}

	if (specified_protocols.length > 1) {
		normalized.protocol = specified_protocols
	} else if (specified_protocols.length === 1) {
		normalized.protocol = specified_protocols[0]
	}

	if ("action" in input && input.action === "permit") {
		normalized.action = "permit"
	} else {
		if ("permit" in input) {
			normalized.action = "permit"
		}
	}

	if ("logging" in input) {
		normalized.logging = !!input.logging
	} else {
		if ("enable_log" in input) {
			normalized.logging = true
		} else if ("disable_log" in input) {
			normalized.logging = false
		}
	}

	return normalized
}
