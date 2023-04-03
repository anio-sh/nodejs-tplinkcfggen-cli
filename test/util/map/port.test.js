const {mapPortNameToInteger, mapIntegerToPortName} = require("../../../src/util/map/port.js")
const assert = require("assert")

describe("util:map/port mapPortNameToInteger", () => {
	it("should return an integer given an numeric port", () => {
		assert.strictEqual(
			mapPortNameToInteger("22"), 22
		)
	})

	it("should return an integer given a known port like 'telnet'", () => {
		assert.strictEqual(
			mapPortNameToInteger("telnet"), 23
		)
	})

	it("should return an array given a known port like 'ftp'", () => {
		assert.deepEqual(
			mapPortNameToInteger("ftp"), [20,21]
		)
	})

	it("should throw an error given an unknown port", () => {
		assert.throws(() => {
			mapPortNameToInteger("unknown")
		}, {
			message: "Unknown port 'unknown'."
		})
	})
})

describe("util:map/port mapIntegerToPortName", () => {
	it("should return the correct name for a numeric port", () => {
		assert.strictEqual(
			mapIntegerToPortName(22), "ssh"
		)
	})

	it("should return a string given an unknown numeric port", () => {
		assert.strictEqual(
			mapIntegerToPortName("2000"), "2000"
		)
	})

	it("should throw an error given an unknown port name", () => {
		assert.throws(() => {
			mapIntegerToPortName("unknown")
		}, {
			message: "Unknown port 'unknown'."
		})
	})
})
