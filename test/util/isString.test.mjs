import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isString from "../../src/util/isString.mjs"
import assert from "assert"

describe("util:isString", function() {
	test("should work as expected", () => {
		assert.deepEqual(isString(""), true)
		assert.deepEqual(isString("123"), true)
		assert.deepEqual(isString(1), false)
		assert.deepEqual(isString([]), false)
		assert.deepEqual(isString({}), false)
	})
})

export default suite
