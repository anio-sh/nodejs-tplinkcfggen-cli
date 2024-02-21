import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: action", () => {
	test("should return a new rule with the correct action value (1)", () => {
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

	test("should return a new rule with the correct action value (2)", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				action: "permit"
			}),
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "permit",
				logging: false
			}
		)
	})

	test("should return the correct rule when 'permit' is specified", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				permit: 1
			}),
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
