import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import {mapPortNameToInteger, mapIntegerToPortName} from "../../../src/util/map/port.mjs"
import assert from "assert"

describe("util:map/port mapPortNameToInteger", () => {
	test("should return an integer given an numeric port", () => {
		assert.strictEqual(
			mapPortNameToInteger("22"), 22
		)
	})

	test("should return an integer given a known port like 'telnet'", () => {
		assert.strictEqual(
			mapPortNameToInteger("telnet"), 23
		)
	})

	test("should return an array given a known port like 'ftp'", () => {
		assert.deepEqual(
			mapPortNameToInteger("ftp"), [20,21]
		)
	})

	test("should throw an error given an unknown port", () => {
		assert.throws(() => {
			mapPortNameToInteger("unknown")
		}, {
			message: "Unknown port 'unknown'."
		})
	})
})

describe("util:map/port mapIntegerToPortName", () => {
	test("should return the correct name for a numeric port", () => {
		assert.strictEqual(
			mapIntegerToPortName(22), "ssh"
		)
	})

	test("should return a string given an unknown numeric port", () => {
		assert.strictEqual(
			mapIntegerToPortName("2000"), "2000"
		)
	})

	test("should throw an error given an unknown port name", () => {
		assert.throws(() => {
			mapIntegerToPortName("unknown")
		}, {
			message: "Unknown port 'unknown'."
		})
	})
})

export default suite
