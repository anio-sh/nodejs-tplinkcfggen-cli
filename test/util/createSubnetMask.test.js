const createSubnetMask = require("../../src/util/createSubnetMask.js")
const assert = require("assert")

describe("util:createSubnetMask", () => {
	it("should return the correct subnet mask for /32", () => {
		assert.equal(createSubnetMask(32), "255.255.255.255")
	})

	it("should return the correct subnet mask for /26", () => {
		assert.equal(createSubnetMask(26), "255.255.255.192")
	})

	it("should return the correct subnet mask for /24", () => {
		assert.equal(createSubnetMask(24), "255.255.255.0")
	})

	it("should return the correct subnet mask for /18", () => {
		assert.equal(createSubnetMask(18), "255.255.192.0")
	})

	it("should return the correct subnet mask for /0", () => {
		assert.equal(createSubnetMask(0), "0.0.0.0")
	})

	it("should throw an error for /-1", () => {
		assert.throws(() => {
			createSubnetMask(-1)
		}, {
			message: "Invalid value for n=-1 (min=0,max=32)"
		})
	})

	it("should throw an error for /33", () => {
		assert.throws(() => {
			createSubnetMask(33)
		}, {
			message: "Invalid value for n=33 (min=0,max=32)"
		})
	})
})
