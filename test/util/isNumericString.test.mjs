import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isNumericString from "../../src/util/isNumericString.mjs"
import assert from "assert"

describe("util:isNumericString", function() {
	test("should work as expected", () => {
		assert.deepEqual(isNumericString(""), false)
		assert.deepEqual(isNumericString("12ab"), false)
		assert.deepEqual(isNumericString("123"), true)
		assert.deepEqual(isNumericString("-123"), false)
	})

	test("should throw an error if a non-string variable is passed", () => {
		assert.throws(() => {
			isNumericString(1)
		}, {
			message: "isNumericString called on non-string variable."
		})
	})
})

export default suite
