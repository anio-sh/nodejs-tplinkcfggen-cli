const isNumericString = require("../../src/util/isNumericString.js")
const assert = require("assert")

describe("util:isNumericString", function() {
	it("should work as expected", () => {
		assert.deepEqual(isNumericString(""), false)
		assert.deepEqual(isNumericString("12ab"), false)
		assert.deepEqual(isNumericString("123"), true)
		assert.deepEqual(isNumericString("-123"), false)
	})

	it("should throw an error if a non-string variable is passed", () => {
		assert.throws(() => {
			isNumericString(1)
		}, {
			message: "isNumericString called on non-string variable."
		})
	})
})
