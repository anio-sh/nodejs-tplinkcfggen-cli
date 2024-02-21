import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import compressIntoRanges from "../../src/util/compressIntoRanges.mjs"
import assert from "assert"

describe("util:compressIntoRanges", function() {
	test("should work as expected (empty array)", () => {
		assert.strictEqual(compressIntoRanges([]), "")
	})

	test("should work as expected (array with 1 element)", () => {
		assert.strictEqual(compressIntoRanges([1]), "1")
		assert.strictEqual(compressIntoRanges([10]), "10")
		assert.strictEqual(compressIntoRanges([1000]), "1000")
	})

	test("should work as expected (ordered, sequenced, array)", () => {
		assert.strictEqual(compressIntoRanges([1,2,3,4]), "1-4")
	})

	test("should work as expected (unordered, sequenced, array)", () => {
		assert.strictEqual(compressIntoRanges([4,2,1,3]), "1-4")
	})

	test("should work as expected (ordered, multiple sequences)", () => {
		assert.strictEqual(compressIntoRanges([
			1,2,3,4,
			6,7,8,9,
			11,12,13,14,15,16,17,18,19,20
		]), "1-4,6-9,11-20")
	})

	test("should work as expected (unordered, multiple sequences)", () => {
		assert.strictEqual(compressIntoRanges([
			9,18,7,19,20,16,17,15,3,6,4,14,8,13,12,11,1,2
		]), "1-4,6-9,11-20")
	})
})

export default suite
