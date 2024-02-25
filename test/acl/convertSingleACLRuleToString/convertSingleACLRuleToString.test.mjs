import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)
const it = test

import convertSingleACLRuleToString from "../../../src/acl/convertSingleACLRuleToString.mjs"
import test_cases from "./test_cases.mjs"

for (const test_case of test_cases) {
	describe(`acl:convertSingleACLRuleToString: ${test_case.label}`, () => {
		for (const test of test_case.tests) {
			it(test.label, (expect) => {
				const test_fn = () => {
					return convertSingleACLRuleToString(test.input.context, test.input.rule)
				}

				if ("output" in test) {
					expect(test_fn()).toBe(test.output)
				} else if ("throws" in test) {
					expect(test_fn).toThrowError(test.throws)
				} else {
					expect(false).toBe(false)
				}
			})
		}
	})
}

export default suite
