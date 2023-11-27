import path from "node:path"
import SandboxedModule from "sandboxed-module"

import {
	UInt32ToIPv4String,
	IPv4StringToUInt32,
	parseIPv4String
} from "@anio-software/network-utils"

export default function(config_file_path) {
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
