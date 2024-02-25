import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: action", () => {
	test("should return a new rule with the correct action value (1)", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst"
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: false
			}
		)
	})

	test("should return a new rule with the correct action value (2)", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				action: "permit"
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "permit",
				logging: false
			}
		)
	})

	test("should return the correct rule when 'permit' is specified", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				permit: 1
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "permit",
				logging: false
			}
		)
	})
})

export default suite
