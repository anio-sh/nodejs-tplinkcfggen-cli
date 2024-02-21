import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import parseACLTargetNotation from "../../src/util/parseACLTargetNotation.mjs"
import assert from "assert"

describe("util:parseACLTargetNotation", () => {
	test("should return the correct values for '0.0.0.0'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("0.0.0.0"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '0.0.0.0:any'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("0.0.0.0:any"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:ftp'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:ftp"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [20,21]
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:22'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:22"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22]
			}
		)
	})

	test("should return the correct values for '127.0.0.1/24:ssh,http'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:ssh,http"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22,80]
			}
		)
	})
})

describe("parseACLTargetNotation any test cases", () => {
	test("should return the correct values for 'any'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for 'any:any'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:any"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": "any"
			}
		)
	})

	test("should return the correct values for 'any:ssh'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:ssh"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": [22]
			}
		)
	})

	test("should return the correct values for 'any:ssh,http'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:ssh,http"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "0.0.0.0",
				"ports": [22, 80]
			}
		)
	})

	test("should throw an error if 'any' is specified with a subnet mask (1)", () => {
		assert.throws(() => {
			parseACLTargetNotation("any/32")
		}, {
			message: "Cannot specify subnet mask for 'any' ip address."
		})
	})

	test("should throw an error if 'any' is specified with a subnet mask (2)", () => {
		assert.throws(() => {
			parseACLTargetNotation("any/32:any")
		}, {
			message: "Cannot specify subnet mask for 'any' ip address."
		})
	})

	test("should throw an error if 'any' is specified with a subnet mask (3)", () => {
		assert.throws(() => {
			parseACLTargetNotation("any/32:ssh")
		}, {
			message: "Cannot specify subnet mask for 'any' ip address."
		})
	})
})

export default suite
