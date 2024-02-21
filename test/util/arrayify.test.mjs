import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import arrayify from "../../src/util/arrayify.mjs"
import assert from "assert"

describe("util:arrayify", function() {
	test("should work as expected", () => {
		assert.deepEqual(arrayify(1), [1])
		assert.deepEqual(arrayify([1]), [1])

		assert.deepEqual(arrayify("test"), ["test"])
	})
})

export default suite
