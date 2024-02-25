import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import arrayify from "../../src/util/arrayify.mjs"

describe("util:arrayify", function() {
	test("should work as expected", (expect) => {
		expect(arrayify(1)).toEqual([1])
		expect(arrayify([1])).toEqual([1])

		expect(arrayify("test")).toEqual(["test"])
	})
})

export default suite
