const normalizeCompressedFormat = require("../../../src/acl/normalizeCompressedFormat.js")
const assert = require("assert")

describe("acl:normalizeCompressedFormat: defaults", () => {
	it("should return a new rule with the correct defaults", () => {
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
})
