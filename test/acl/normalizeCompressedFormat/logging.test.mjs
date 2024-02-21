import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: logging", () => {
	test("should return a new rule with the correct logging value (1)", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst"
			}),
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: false
			}
		)
	})

	test("should return a new rule with the correct logging value (2)", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				logging: true
			}),
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: true
			}
		)
	})

	test("should return the correct rule when 'enable_log' is specified", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				enable_log: 1
			}),
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
