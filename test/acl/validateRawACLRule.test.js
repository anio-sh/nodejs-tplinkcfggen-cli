const validateRawACLRule = require("../../src/acl/validateRawACLRule.js")
const assert = require("assert")

describe("acl:validateRawACLRule", () => {
	it("should throw an error if multiple source ports are specified", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "10.0.0.1:24,25",
				destination: "any",
				protocol: "udp"
			})
		}, {
			message: "Cannot have more than one source port (got 2): '10.0.0.1:24,25'."
		})
	})

	it("should throw an error if multiple destination ports are specified", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any",
				destination: "10.0.0.1:24,25",
				protocol: "udp"
			})
		}, {
			message: "Cannot have more than one destination port (got 2): '10.0.0.1:24,25'."
		})
	})

	it("should throw an error if source port is specified without protocol", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any:24",
				destination: "10.0.0.1"
			})
		}, {
			message: "Cannot have a source port (24) without matching protocol (protocol given: none)."
		})
	})

	it("should throw an error if source port is specified with wrong protocol", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any:24",
				destination: "10.0.0.1",
				protocol: "icmp"
			})
		}, {
			message: "Cannot have a source port (24) without matching protocol (protocol given: icmp)."
		})
	})

	it("should throw an error if destination port is specified without protocol", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any",
				destination: "10.0.0.1:24"
			})
		}, {
			message: "Cannot have a destination port (24) without matching protocol (protocol given: none)."
		})
	})

	it("should throw an error if destination port is specified wrong protocol", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any",
				destination: "10.0.0.1:24",
				protocol: "icmp"
			})
		}, {
			message: "Cannot have a destination port (24) without matching protocol (protocol given: icmp)."
		})
	})

	it("should throw an error if no action was specified", () => {
		assert.throws(() => {
			validateRawACLRule({
				source: "any",
				destination: "10.0.0.1",
				protocol: "icmp"
			})
		}, {
			message: "action is missing."
		})
	})
})
