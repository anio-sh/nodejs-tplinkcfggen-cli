import isString from "../../src/util/isString.mjs"
import assert from "assert"

describe("util:isString", function() {
	it("should work as expected", () => {
		assert.deepEqual(isString(""), true)
		assert.deepEqual(isString("123"), true)
		assert.deepEqual(isString(1), false)
		assert.deepEqual(isString([]), false)
		assert.deepEqual(isString({}), false)
	})
})
