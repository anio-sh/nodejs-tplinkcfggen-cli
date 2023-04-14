const test_cases = require("./test/acl/convertSingleACLRuleToString/test_cases.js")
let acl_id = 600
let rule_id = 1

for (const test_case of test_cases) {

	for (const test of test_case.tests) {
		if (!("output" in test)) continue

		let expected_output = test.output

		expected_output = expected_output.slice("access-list ip 550 rule 1111 ".length)

		process.stdout.write(
			`access-list ip ${acl_id} rule ${rule_id} ${expected_output}\n`
		)

		rule_id += 1
	}

}
