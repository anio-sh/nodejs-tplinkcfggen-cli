import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import parseACLTargetNotation from "../../src/util/parseACLTargetNotation.mjs"

describe("util:parseACLTargetNotation", () => {
	test("should return the correct values for '0.0.0.0'", (expect) => {
		expect(
			parseACLTargetNotation("0.0.0.0")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '0.0.0.0:any'", (expect) => {
		expect(
			parseACLTargetNotation("0.0.0.0:any")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24'", (expect) => {
		expect(
			parseACLTargetNotation("127.0.0.1/24")
		).toEqual(
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:ftp'", (expect) => {
		expect(
			parseACLTargetNotation("127.0.0.1/24:ftp")
		).toEqual(
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [20,21]
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:22'", (expect) => {
		expect(
			parseACLTargetNotation("127.0.0.1/24:22")
		).toEqual(
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22]
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:ssh,http'", (expect) => {
		expect(
			parseACLTargetNotation("127.0.0.1/24:ssh,http")
		).toEqual(
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22,80]
			}
		)
	})
})

describe("parseACLTargetNotation any test cases", () => {
	test("should return the correct values for 'any'", (expect) => {
		expect(
			parseACLTargetNotation("any")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for 'any:any'", (expect) => {
		expect(
			parseACLTargetNotation("any:any")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for 'any:ssh'", (expect) => {
		expect(
			parseACLTargetNotation("any:ssh")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": [22]
			}
		)
	})

	test("should return the correct values for 'any:ssh,http'", (expect) => {
		expect(
			parseACLTargetNotation("any:ssh,http")
		).toEqual(
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": [22, 80]
			}
		)
	})

	test("should throw an error if 'any' is specified with a subnet mask (1)", (expect) => {
		expect(() => {
			parseACLTargetNotation("any/32")
		}).toThrowError(`Cannot specify subnet mask for 'any' ip address.`)
	})

	test("should throw an error if 'any' is specified with a subnet mask (2)", (expect) => {
		expect(() => {
			parseACLTargetNotation("any/32:any")
		}).toThrowError(`Cannot specify subnet mask for 'any' ip address.`)
	})

	test("should throw an error if 'any' is specified with a subnet mask (3)", (expect) => {
		expect(() => {
			parseACLTargetNotation("any/32:ssh")
		}).toThrowError(`Cannot specify subnet mask for 'any' ip address.`)
	})
})

export default suite
