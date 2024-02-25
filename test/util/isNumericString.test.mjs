import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isNumericString from "../../src/util/isNumericString.mjs"

describe("util:isNumericString", function() {
	test("should work as expected", (expect) => {
		expect(isNumericString("")).toBe(false)
		expect(isNumericString("12ab")).toBe(false)
		expect(isNumericString("123")).toBe(true)
		expect(isNumericString("-123")).toBe(false)
	})

	test("should throw an error if a non-string variable is passed", (expect) => {
		expect(() => {
			isNumericString(1)
		}).toThrowError(`isNumericString called on non-string variable.`)
	})
})

export default suite
