import arrayify from "../../src/util/arrayify.mjs"
import assert from "assert"

describe("util:arrayify", function() {
	it("should work as expected", () => {
		assert.deepEqual(arrayify(1), [1])
		assert.deepEqual(arrayify([1]), [1])

		assert.deepEqual(arrayify("test"), ["test"])
	})
})
