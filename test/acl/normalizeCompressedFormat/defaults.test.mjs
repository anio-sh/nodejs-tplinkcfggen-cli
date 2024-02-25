import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: defaults", () => {
	test("should return a new rule with the correct defaults", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst"
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "none",
				action: "deny",
				logging: false
			}
		)
	})
})

export default suite
