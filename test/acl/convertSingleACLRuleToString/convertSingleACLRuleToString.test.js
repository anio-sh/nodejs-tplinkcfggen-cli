const convertSingleACLRuleToString = require("../../../src/acl/convertSingleACLRuleToString.js")
const assert = require("assert")
const test_cases = require("./test_cases.js")

for (const test_case of test_cases) {
	describe(`acl:convertSingleACLRuleToString: ${test_case.label}`, () => {
		for (const test of test_case.tests) {
			it(test.label, () => {
				const test_fn = () => {
					return convertSingleACLRuleToString(test.input.context, test.input.rule)
				}

				if ("output" in test) {
					assert.strictEqual(test_fn(), test.output)
				} else if ("throws" in test) {
					assert.throws(test_fn, {
						message: test.throws
					})
				} else {
					assert.strictEqual(false, true)
				}
			})
		}
	})
}
