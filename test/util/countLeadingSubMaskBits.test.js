const countLeadingSubMaskBits = require("../../src/util/countLeadingSubMaskBits.js")
const assert = require("assert")

describe("util:countLeadingSubMaskBits", () => {
	it("should return the correct number for '255.255.255.255'", () => {
		assert.equal(countLeadingSubMaskBits("255.255.255.255"), 32)
	})

	it("should return the correct number for '255.255.192.0'", () => {
		assert.equal(countLeadingSubMaskBits("255.255.192.0"), 18)
	})

	it("should return the correct number for '0.0.0.0'", () => {
		assert.equal(countLeadingSubMaskBits("0.0.0.0"), 0)
	})
})

