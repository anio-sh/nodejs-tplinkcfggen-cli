const isString = require("../../src/util/isString.js")
const assert = require("assert")

describe("util:isString", function() {
	it("should work as expected", () => {
		assert.deepEqual(isString(""), true)
		assert.deepEqual(isString("123"), true)
		assert.deepEqual(isString(1), false)
		assert.deepEqual(isString([]), false)
		assert.deepEqual(isString({}), false)
	})
})
