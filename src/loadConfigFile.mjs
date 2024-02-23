import fs from "node:fs/promises"

import {
	UInt32ToIPv4String,
	IPv4StringToUInt32,
	parseIPv4String
} from "@anio-core-sh/js-utils"

let saved_global_context = {}

function saveGlobalContext(context) {
	const vars = Object.keys(context)

	for (const varname of vars) {
		saved_global_context[varname] = globalThis[varname]
	}
}

function restoreGlobalContext(context) {
	const vars = Object.keys(saved_global_context)

	for (const varname of vars) {
		globalThis[varname] = saved_global_context[varname]
	}
}

export default async function(config_file_path) {
	const context = {
		tcp: "tcp",
		udp: "udp",
		deny: "deny",
		permit: "permit",
		any: "any",

		UInt32ToIPv4String,
		IPv4StringToUInt32,
		parseIPv4String
	}

	globalThis.udp = "hi"

	saveGlobalContext(context)

	for (const k in context) {
		globalThis[k] = context[k]
	}

	// realpath needed because import() wouldn't work otherwise
	const config = (await import(
		await fs.realpath(config_file_path)
	)).default

	restoreGlobalContext()

	return config
}
