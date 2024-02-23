import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import isString from "../../src/util/isString.mjs"

describe("util:isString", function() {
	test("should work as expected", (expect) => {
		expect(isString("")).toBe(true)
		expect(isString("123")).toBe(true)
		expect(isString(1)).toBe(false)
		expect(isString([])).toBe(false)
		expect(isString({})).toBe(false)
	})
})

export default suite
