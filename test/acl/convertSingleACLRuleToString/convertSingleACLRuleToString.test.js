const convertSingleACLRuleToString = require("../../../src/acl/convertSingleACLRuleToString.js")
const assert = require("assert")
const test_cases = require("./test_cases.js")

for (const test_case of test_cases) {
	describe(`acl:convertSingleACLRuleToString: ${test_case.label}`, () => {
		for (const test of test_case.tests) {

			it(test.label, () => {
				assert.strictEqual(
					convertSingleACLRuleToString(test.input.context, test.input.rule),
					test.output
				)
			})

		}
	})
}
