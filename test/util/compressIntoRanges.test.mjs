import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import compressIntoRanges from "../../src/util/compressIntoRanges.mjs"

describe("util:compressIntoRanges", function() {
	test("should work as expected (empty array)", (expect) => {
		expect(compressIntoRanges([])).toBe("")
	})

	test("should work as expected (array with 1 element)", (expect) => {
		expect(compressIntoRanges([1])).toBe("1")
		expect(compressIntoRanges([10])).toBe("10")
		expect(compressIntoRanges([1000])).toBe("1000")
	})

	test("should work as expected (ordered, sequenced, array)", (expect) => {
		expect(compressIntoRanges([1,2,3,4])).toBe("1-4")
	})

	test("should work as expected (unordered, sequenced, array)", (expect) => {
		expect(compressIntoRanges([4,2,1,3])).toBe("1-4")
	})

	test("should work as expected (ordered, multiple sequences)", (expect) => {
		expect(compressIntoRanges([
			1,2,3,4,
			6,7,8,9,
			11,12,13,14,15,16,17,18,19,20
		])).toBe("1-4,6-9,11-20")
	})

	test("should work as expected (unordered, multiple sequences)", (expect) => {
		expect(compressIntoRanges([
			9,18,7,19,20,16,17,15,3,6,4,14,8,13,12,11,1,2
		])).toBe("1-4,6-9,11-20")
	})
})

export default suite
