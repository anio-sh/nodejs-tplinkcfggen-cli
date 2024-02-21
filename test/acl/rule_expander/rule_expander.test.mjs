import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import acl_test_cases from "./test_cases.mjs"
import path from "path"
import assert from "assert"
import ruleExpander from "../../../src/acl/rule_expander/index.mjs"
import {fileURLToPath} from "url"

const __dirname = path.dirname(
	fileURLToPath(import.meta.url)
)

for (const key in acl_test_cases) {
	const acl_test = acl_test_cases[key]

	const fn = (await import(
		path.resolve(__dirname, "..", "..", "..", acl_test.file)
	)).default


	describe(`acl:${key}`, () => {
		for (const test_case of acl_test.cases) {

			test(test_case.label, () => {
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

describe("acl:rule_expander: ruleExpander", () => {
	for (const key in acl_test_cases) {
		const acl_test = acl_test_cases[key]

		for (const test_case of acl_test.cases) {

			test(`cross check '${test_case.label}'`, () => {

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

export default suite
