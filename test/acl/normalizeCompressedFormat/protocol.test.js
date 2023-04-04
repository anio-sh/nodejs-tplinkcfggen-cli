const normalizeCompressedFormat = require("../../../src/acl/normalizeCompressedFormat.js")
const assert = require("assert")

describe("acl:normalizeCompressedFormat: protocol", () => {
	it("should return a new rule with the correct protocol (1)", () => {
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

	it("should return a new rule with the correct protocol (2)", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				protocol: "none"
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

	it("should return a new rule with the correct protocol (3)", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				protocol: "tcp"
			}),
			{
				source: "src",
				destination: "dst",
				protocol: "tcp",
				action: "deny",
				logging: false
			}
		)
	})

	it("should return the correct rule when 'tcp' is specified", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				tcp: 1
			}),
			{
				source: "src",
				destination: "dst",
				protocol: "tcp",
				action: "deny",
				logging: false
			}
		)
	})

	it("should return the correct rule when 'tcp' and 'udp' are specified at the same time", () => {
		assert.deepEqual(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				tcp: 1,
				udp: 1
			}),
			{
				source: "src",
				destination: "dst",
				protocol: ["tcp", "udp"],
				action: "deny",
				logging: false
			}
		)
	})
})
