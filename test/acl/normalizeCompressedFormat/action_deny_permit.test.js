const normalizeCompressedFormat = require("../../../src/acl/normalizeCompressedFormat.js")
const assert = require("assert")

describe("acl:normalizeCompressedFormat: action_deny_permit", () => {
	it("should throw an error if 'deny' is specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				action: "deny"
			})
		}, {
			message: "Cannot specify 'deny' along side 'action' at the same time."
		})
	})

	it("should throw an error if 'permit' is specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				action: "permit"
			})
		}, {
			message: "Cannot specify 'permit' along side 'action' at the same time."
		})
	})

	it("should throw an error if 'deny' and 'permit' are specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				deny: 1,
				action: "permit"
			})
		})
	})

	it("should throw an error if 'deny' and 'permit' are specified at the same time", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				permit: 1
			})
		}, {
			message: "Cannot specify 'deny' along side 'permit' at the same time."
		})
	})
})
