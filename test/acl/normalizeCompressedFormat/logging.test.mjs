import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: logging", () => {
	test("should return a new rule with the correct logging value (1)", (expect) => {
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

	test("should return a new rule with the correct logging value (2)", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				logging: true
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: true
			}
		)
	})

	test("should return the correct rule when 'enable_log' is specified", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				enable_log: 1
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: true
			}
		)
	})
})

export default suite
