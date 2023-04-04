const convert_basic = require("./basic/convert.js")
const convert_vlan = require("./vlan/convert.js")
const convert_port = require("./port/convert.js")
const convert_acl = require("./acl/convert.js")

module.exports = function(config) {
	let config_str = ""

	config_str += convert_basic(config)
	config_str += convert_vlan(config)
	config_str += convert_port(config)
	config_str += convert_acl(config)

	let clean_config = config_str.split("\n").map(line => {
		if (!line.trim().length) {
			return "#"
		}

		return line
	}).join("\n")

	return `${clean_config}\nend\n\x00`
}
