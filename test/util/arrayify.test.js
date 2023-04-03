const arrayify = require("../../src/util/arrayify.js")
const assert = require("assert")

describe("util:arrayify", function() {
	it("should work as expected", () => {
		assert.deepEqual(arrayify(1), [1])
		assert.deepEqual(arrayify([1]), [1])

		assert.deepEqual(arrayify("test"), ["test"])
	})
})
