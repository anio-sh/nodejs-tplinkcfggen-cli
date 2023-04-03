const acl_test_cases = require("./acl_test_cases.js")
const path = require("path")
const assert = require("assert")
const ruleExpander = require("../../src/acl/rule_expander/index.js")

for (const key in acl_test_cases) {
	const acl_test = acl_test_cases[key]

	const fn = require(
		path.resolve(__dirname, "..", "..", acl_test.file)
	)

	describe(key, () => {
		for (const test_case of acl_test.cases) {

			it(test_case.label, () => {
				if ("output" in test_case) {
					assert.deepEqual(
						fn(test_case.input), test_case.output
					)
				} else if ("throws" in test_case) {
					assert.throws(() => {
						fn(test_case.input)
					}, {
						message: test_case.throws
					})
				} else {
					assert.strictEqual(1, 1)
				}
			})
		}
	})
}

describe("rule_expander", () => {
	for (const key in acl_test_cases) {
		const acl_test = acl_test_cases[key]

		for (const test_case of acl_test.cases) {

			it(`cross check '${test_case.label}'`, () => {

				if ("output" in test_case) {
					assert.deepEqual(
						ruleExpander(test_case.input),
						test_case.output
					)
				} else if ("throws" in test_case) {
					assert.throws(() => {
						ruleExpander(test_case.input)
					}, {
						message: test_case.throws
					})
				} else {
					assert.strictEqual(1, 1)
				}

			})
		}
	}
})
