const convert_basic = require("./basic/convert.js")
const convert_vlan = require("./vlan/convert.js")
const convert_port = require("./port/convert.js")
const convert_acl = require("./acl/convert.js")
const arrayify = require("./util/arrayify.js")

module.exports = function(config) {
	let config_str = ""

	config_str += convert_basic(config)
	config_str += convert_vlan(config)
	config_str += convert_port(config)
	config_str += convert_acl(config)

	let config_lines = config_str.split("\n")

	// prepend configuration lines from config (if specified)
	if ("prepended_configuration_lines" in config) {
		for (const line of arrayify(config.prepended_configuration_lines).reverse()) {
			config_lines.unshift(line)
		}
	}

	// append configuration lines from config (if specified)
	if ("appended_configuration_lines" in config) {
		config_lines.push("")

		for (const line of arrayify(config.appended_configuration_lines)) {
			config_lines.push(line)
		}

		config_lines.push("")
	}

	let clean_config = config_lines.map(line => {
		if (!line.trim().length) {
			return "#"
		}

		return line
	}).join("\n")

	return `${clean_config}\nend\n\x00`
}
