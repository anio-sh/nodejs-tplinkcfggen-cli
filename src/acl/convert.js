const convertRulesListToString = require("./convertRulesListToString.js")
const arrayify = require("../util/arrayify.js")

module.exports = function(acl_config) {
	let parts = []

	parts.push(
		`access-list create ${acl_config.id} name "${acl_config.name}"`
	)

	parts.push(
		convertRulesListToString(acl_config)
	)

	if ("bind_to" in acl_config) {
		for (const port of arrayify(acl_config.bind_to)) {
			parts.push(`access-list bind ${acl_config.id} interface ${port}`)
		}
	}

	return parts.join("\n")
}
