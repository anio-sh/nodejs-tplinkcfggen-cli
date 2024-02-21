import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import countLeadingSubMaskBits from "../../src/util/countLeadingSubMaskBits.mjs"
import assert from "assert"

describe("util:countLeadingSubMaskBits", () => {
	test("should return the correct number for '255.255.255.255'", () => {
		assert.equal(countLeadingSubMaskBits("255.255.255.255"), 32)
	})

	test("should return the correct number for '255.255.192.0'", () => {
		assert.equal(countLeadingSubMaskBits("255.255.192.0"), 18)
	})

	test("should return the correct number for '0.0.0.0'", () => {
		assert.equal(countLeadingSubMaskBits("0.0.0.0"), 0)
	})
})

export default suite
