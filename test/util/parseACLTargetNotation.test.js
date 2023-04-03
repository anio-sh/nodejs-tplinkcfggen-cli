const parseACLTargetNotation = require("../../src/util/parseACLTargetNotation.js")
const assert = require("assert")

describe("parseACLTargetNotation", () => {
	it("should return the correct values for '0.0.0.0'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("0.0.0.0"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	it("should return the correct values for '0.0.0.0:any'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("0.0.0.0:any"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": "any"
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24:ftp'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:ftp"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [20,21]
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24:ftp,dhcp'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:ftp,dhcp"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [20,21,67,68]
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24:dhcp'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:dhcp"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [67,68]
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24:22'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:22"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22]
			}
		)
	})

	it("should return the correct values for '127.0.0.1/24:ssh,http'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("127.0.0.1/24:ssh,http"),
			{
				"ip": "127.0.0.1",
				"subnet_mask": "255.255.255.0",
				"ports": [22,80]
			}
		)
	})

	it("should return the correct values for 'any:any'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:any"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": "any"
			}
		)
	})

	it("should return the correct values for 'any:22'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:22"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": [22]
			}
		)
	})

	it("should return the correct values for 'any:ssh'", () => {
		assert.deepStrictEqual(
			parseACLTargetNotation("any:ssh"),
			{
				"ip": "0.0.0.0",
				"subnet_mask": "255.255.255.255",
				"ports": [22]
			}
		)
	})
})

