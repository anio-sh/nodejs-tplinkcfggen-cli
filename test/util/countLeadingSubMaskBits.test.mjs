import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import countLeadingSubMaskBits from "../../src/util/countLeadingSubMaskBits.mjs"

describe("util:countLeadingSubMaskBits", () => {
	test("should return the correct number for '255.255.255.255'", (expect) => {
		expect(countLeadingSubMaskBits("255.255.255.255")).toBe(32)
	})

	test("should return the correct number for '255.255.192.0'", (expect) => {
		expect(countLeadingSubMaskBits("255.255.192.0")).toBe(18)
	})

	test("should return the correct number for '0.0.0.0'", (expect) => {
		expect(countLeadingSubMaskBits("0.0.0.0")).toBe(0)
	})
})

export default suite
