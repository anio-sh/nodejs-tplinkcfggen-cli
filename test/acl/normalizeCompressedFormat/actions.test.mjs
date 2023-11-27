import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: action", () => {
	it("should return a new rule with the correct action value (1)", () => {
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

	it("should return a new rule with the correct action value (2)", () => {
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

	it("should return the correct rule when 'permit' is specified", () => {
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
