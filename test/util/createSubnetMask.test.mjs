import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import createSubnetMask from "../../src/util/createSubnetMask.mjs"
import assert from "assert"

describe("util:createSubnetMask", () => {
	test("should return the correct subnet mask for /32", () => {
		assert.equal(createSubnetMask(32), "255.255.255.255")
	})

	test("should return the correct subnet mask for /26", () => {
		assert.equal(createSubnetMask(26), "255.255.255.192")
	})

	test("should return the correct subnet mask for /24", () => {
		assert.equal(createSubnetMask(24), "255.255.255.0")
	})

	test("should return the correct subnet mask for /18", () => {
		assert.equal(createSubnetMask(18), "255.255.192.0")
	})

	test("should return the correct subnet mask for /0", () => {
		assert.equal(createSubnetMask(0), "0.0.0.0")
	})

	test("should throw an error for /-1", () => {
		assert.throws(() => {
			createSubnetMask(-1)
		}, {
			message: "Invalid value for n=-1 (min=0,max=32)"
		})
	})

	test("should throw an error for /33", () => {
		assert.throws(() => {
			createSubnetMask(33)
		}, {
			message: "Invalid value for n=33 (min=0,max=32)"
		})
	})
})

export default suite
