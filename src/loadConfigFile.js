const SandboxedModule = require("sandboxed-module")
const path = require("path")

module.exports = function(config_file_path) {
	const context = {
		tcp: "tcp",
		udp: "udp",
		deny: "deny",
		permit: "permit",
		any: "any",
		console,
		process
	}

	const config = SandboxedModule.require(path.resolve(config_file_path), {
		globals: context
	})

	return config
}
