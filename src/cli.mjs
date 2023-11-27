#!/usr/bin/env -S node --experimental-detect-module
import fs from "node:fs"
import loadConfigFile from "./loadConfigFile.mjs"
import process from "node:process"
import tpLinkConfigGenerator from "./index.mjs"

if (process.argv.length !== 3) {
	process.stderr.write(
		`Usage: anio_tplinkcfggen <config.mjs>\n`
	)

	process.exit(2)
}

const input_config_file = process.argv[2]

try {
	if (!fs.statSync(input_config_file).isFile()) {
		throw new Error()
	}
} catch (error) {
	process.stderr.write(`${input_config_file}: no such file.\n`)
	process.exit(2)
}

try {
	process.stdout.write(
		tpLinkConfigGenerator(
			await loadConfigFile(input_config_file)
		)
	)
} catch (error) {
	if (error.message.startsWith("UserInputError:")) {
		process.stderr.write(error.message + "\n\n")

		process.exit(2)
	}

	throw error
}
