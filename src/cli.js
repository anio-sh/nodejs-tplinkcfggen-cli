#!/usr/bin/env node
const fs = require("fs")
const loadConfigFile = require("./loadConfigFile.js")
const tpLinkConfigGenerator = require("./index.js")

if (process.argv.length !== 3) {
	process.stderr.write(
		`tp-link-cfg-gen <input-config.json>\n`
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
			loadConfigFile(input_config_file)
		)
	)
} catch (error) {
	if (error.message.startsWith("UserInputError:")) {
		process.stderr.write(error.message + "\n\n")

		process.exit(2)
	}

	throw error
}
