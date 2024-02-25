import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import acl_test_cases from "./test_cases.mjs"
import ruleExpander from "../../../src/acl/rule_expander/index.mjs"

import byDestinationPorts from "../../../src/acl/rule_expander/byDestinationPorts.mjs"
import byProtocol from "../../../src/acl/rule_expander/byProtocol.mjs"
import bySourceAndDestination from "../../../src/acl/rule_expander/bySourceAndDestination.mjs"

const implementations = {byDestinationPorts, byProtocol, bySourceAndDestination}

for (const key in acl_test_cases) {
	const acl_test = acl_test_cases[key]

	const fn = implementations[acl_test.implementation]

	describe(`acl:${key}`, () => {
		for (const test_case of acl_test.cases) {

			test(test_case.label, (expect) => {
				if ("output" in test_case) {
					expect(fn(test_case.input)).toEqual(test_case.output)
				} else if ("throws" in test_case) {
					expect(() => {
						fn(test_case.input)
					}).toThrowError(test_case.throws)
				} else {
					expect(1).toBe(1)
				}
			})
		}
	})
}

describe("acl:rule_expander: ruleExpander", () => {
	for (const key in acl_test_cases) {
		const acl_test = acl_test_cases[key]

		for (const test_case of acl_test.cases) {

			test(`cross check '${test_case.label}'`, (expect) => {

				if ("output" in test_case) {
					expect(
						ruleExpander(test_case.input)
					).toEqual(
						test_case.output
					)
				} else if ("throws" in test_case) {
					expect(() => {
						ruleExpander(test_case.input)
					}).toThrowError(test_case.throws)
				} else {
					expect(1).toBe(1)
				}

			})
		}
	}
})

export default suite
