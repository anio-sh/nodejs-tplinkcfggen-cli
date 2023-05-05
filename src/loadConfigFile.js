const SandboxedModule = require("sandboxed-module")
const path = require("path")

const {
	UInt32ToIPv4String,
	IPv4StringToUInt32,
	parseIPv4String
} = require("@anio-software/network-utils")

module.exports = function(config_file_path) {
	const context = {
		tcp: "tcp",
		udp: "udp",
		deny: "deny",
		permit: "permit",
		any: "any",
		console,
		process,

		UInt32ToIPv4String,
		IPv4StringToUInt32,
		parseIPv4String
	}

	const config = SandboxedModule.require(path.resolve(config_file_path), {
		globals: context
	})

	return config
}
