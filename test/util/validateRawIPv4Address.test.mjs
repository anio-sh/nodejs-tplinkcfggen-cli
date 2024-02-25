import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import validateRawIPv4Address from "../../src/util/validateRawIPv4Address.mjs"

describe("util:validateRawIPv4Address", function() {
	test("should not throw for valid IPv4 addresses", () => {
		validateRawIPv4Address("1.2.3.4")
		validateRawIPv4Address("255.255.255.255")
		validateRawIPv4Address("0.0.0.0")
		validateRawIPv4Address("10.0.0.1")
	})

	test("should throw for invalid IPv4 addresses", (expect) => {
		expect(() => {
			validateRawIPv4Address("1.2.3")
		}).toThrowError(`Invalid number of octets in IPv4Address '1.2.3'.`)

		expect(() => {
			validateRawIPv4Address("1.2.3.256")
		}).toThrowError(`Octet value '256' is out of range in IPv4Address '1.2.3.256'.`)

		expect(() => {
			validateRawIPv4Address("1.2.3.b")
		}).toThrowError(`Found non-numeric octect 'b' in IPv4Address '1.2.3.b'.`)

		expect(() => {
			validateRawIPv4Address("")
		}).toThrowError(`Invalid number of octets in IPv4Address ''.`)

		expect(() => {
			validateRawIPv4Address("1.2.3.4.5")
		}).toThrowError(`Invalid number of octets in IPv4Address '1.2.3.4.5'.`)
	})
})

export default suite
