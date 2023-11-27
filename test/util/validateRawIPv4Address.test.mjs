import validateRawIPv4Address from "../../src/util/validateRawIPv4Address.mjs"
import assert from "assert"

describe("util:validateRawIPv4Address", function() {
	it("should not throw for valid IPv4 addresses", () => {
		validateRawIPv4Address("1.2.3.4")
		validateRawIPv4Address("255.255.255.255")
		validateRawIPv4Address("0.0.0.0")
		validateRawIPv4Address("10.0.0.1")
	})

	it("should throw for invalid IPv4 addresses", () => {
		assert.throws(() => {
			validateRawIPv4Address("1.2.3")
		}, {
			message: "Invalid number of octets in IPv4Address '1.2.3'."
		})

		assert.throws(() => {
			validateRawIPv4Address("1.2.3.256")
		}, {
			message: "Octet value '256' is out of range in IPv4Address '1.2.3.256'."
		})

		assert.throws(() => {
			validateRawIPv4Address("1.2.3.b")
		}, {
			message: "Found non-numeric octect 'b' in IPv4Address '1.2.3.b'."
		})

		assert.throws(() => {
			validateRawIPv4Address("")
		}, {
			message: "Invalid number of octets in IPv4Address ''."
		})

		assert.throws(() => {
			validateRawIPv4Address("1.2.3.4.5")
		}, {
			message: "Invalid number of octets in IPv4Address '1.2.3.4.5'."
		})
	})
})
