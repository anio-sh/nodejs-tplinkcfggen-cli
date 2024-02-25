import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import createSubnetMask from "../../src/util/createSubnetMask.mjs"

describe("util:createSubnetMask", () => {
	test("should return the correct subnet mask for /32", (expect) => {
		expect(createSubnetMask(32)).toBe("255.255.255.255")
	})

	test("should return the correct subnet mask for /26", (expect) => {
		expect(createSubnetMask(26)).toBe("255.255.255.192")
	})

	test("should return the correct subnet mask for /24", (expect) => {
		expect(createSubnetMask(24)).toBe("255.255.255.0")
	})

	test("should return the correct subnet mask for /18", (expect) => {
		expect(createSubnetMask(18)).toBe("255.255.192.0")
	})

	test("should return the correct subnet mask for /0", (expect) => {
		expect(createSubnetMask(0)).toBe("0.0.0.0")
	})

	test("should throw an error for /-1", (expect) => {
		expect(() => {
			createSubnetMask(-1)
		}).toThrowError(`Invalid value for n=-1 (min=0,max=32)`)
	})

	test("should throw an error for /33", (expect) => {
		expect(() => {
			createSubnetMask(33)
		}).toThrowError(`Invalid value for n=33 (min=0,max=32)`)
	})
})

export default suite
