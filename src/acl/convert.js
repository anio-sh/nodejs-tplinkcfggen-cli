const convertRulesListToString = require("./convertRulesListToString.js")
const arrayify = require("../util/arrayify.js")
const validateACLName = require("./validateACLName.js")
const printDiagnosticMessage = require("../util/printDiagnosticMessage.js")

module.exports = function(device_config) {
	if (!("access_list" in device_config)) {
		// nothing to do here
		return ""
	}

	let parts = []
	let current_acl_id = 500

	for (const access_list of device_config.access_list) {
		validateACLName(access_list.name)

		parts.push(`access-list create ${current_acl_id} name "${access_list.name}"`)

		// always overwrite acl id (i.e. use current_acl_id)
		const {string, n_rules} = convertRulesListToString({
			...access_list,
			id: current_acl_id
		})

		// push acl rules string to output string array
		parts.push(string)

		if ("bind_to" in access_list) {
			for (const port of arrayify(access_list.bind_to)) {
				parts.push(`access-list bind ${current_acl_id} interface ${port}`)
			}
		}

		printDiagnosticMessage(`create acl with id='${current_acl_id}', name='${access_list.name}' and with ${n_rules} rules`)

		current_acl_id += 10
	}

	return parts.join("\n")
}
