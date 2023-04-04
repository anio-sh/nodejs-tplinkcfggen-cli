const SandboxedModule = require("sandboxed-module")

module.exports = function(config_file_path) {
	const context = {
		tcp: "tcp",
		udp: "udp",
		deny: "deny",
		permit: "permit",
		any: "any"
	}

	const config = SandboxedModule.require(config_file_path, {
		globals: context
	})

	return config
}
