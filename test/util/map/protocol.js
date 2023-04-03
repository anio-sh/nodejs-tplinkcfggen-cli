const {mapProtocolNameToInteger, mapIntegerToProtocolName} = require("../../../src/util/map/port.js")
const assert = require("assert")

describe("util:map/protocol mapProtocolNameToInteger", () => {
	it("should return an integer given a numeric protocol", () => {
		assert.strictEqual(
			mapProtocolNameToInteger("22"), 22
		)
	})

	it("should return an integer given a known protocol name", () => {
		assert.strictEqual(
			mapProtocolNameToInteger("tcp"), 6
		)
	})

	it("should throw an error given an unknown protocol name", () => {
		assert.throws(() => {
			mapProtocolNameToInteger("unknown")
		}, {
			message: "Unknown protocol 'unknown'."
		})
	})
})

describe("util:map/protocol mapIntegerToProtocolName", () => {
	it("should return the correct name for a protocol", () => {
		assert.strictEqual(
			mapIntegerToProtocolName(17), "udp"
		)
	})

	it("should return a string given an unknown numeric protocol value", () => {
		assert.strictEqual(
			mapIntegerToProtocolName("2000"), "2000"
		)
	})

	it("should throw an error given an unknown protocol name", () => {
		assert.throws(() => {
			mapIntegerToProtocolName("unknown")
		}, {
			message: "Unknown protocol 'unknown'."
		})
	})
})
