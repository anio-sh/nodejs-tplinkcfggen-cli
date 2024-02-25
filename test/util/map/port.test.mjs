import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import {mapPortNameToInteger, mapIntegerToPortName} from "../../../src/util/map/port.mjs"

describe("util:map/port mapPortNameToInteger", () => {
	test("should return an integer given an numeric port", (expect) => {
		expect(mapPortNameToInteger("22")).toBe(22)
	})

	test("should return an integer given a known port like 'telnet'", (expect) => {
		expect(mapPortNameToInteger("telnet")).toBe(23)
	})

	test("should return an array given a known port like 'ftp'", (expect) => {
		expect(mapPortNameToInteger("ftp")).toEqual([20,21])
	})

	test("should throw an error given an unknown port", (expect) => {
		expect(() => {
			mapPortNameToInteger("unknown")
		}).toThrowError(`Unknown port 'unknown'.`)
	})
})

describe("util:map/port mapIntegerToPortName", () => {
	test("should return the correct name for a numeric port", (expect) => {
		expect(mapIntegerToPortName(22)).toBe("ssh")
	})

	test("should return a string given an unknown numeric port", (expect) => {
		expect(mapIntegerToPortName("2000")).toBe("2000")
	})

	test("should throw an error given an unknown port name", (expect) => {
		expect(() => {
			mapIntegerToPortName("unknown")
		}).toThrowError(`Unknown port 'unknown'.`)
	})
})

export default suite
