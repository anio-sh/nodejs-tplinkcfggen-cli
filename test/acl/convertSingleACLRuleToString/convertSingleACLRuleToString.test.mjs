import convertSingleACLRuleToString from "../../../src/acl/convertSingleACLRuleToString.mjs"
import assert from "assert"
import test_cases from "./test_cases.mjs"

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
