import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: action_deny_permit", () => {
	test("should throw an error if 'deny' is specified along side with 'action'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				action: "deny"
			})
		}).toThrowError(`Cannot specify 'deny' along side 'action' at the same time.`)
	})

	test("should throw an error if 'permit' is specified along side with 'action'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				action: "permit"
			})
		}).toThrowError(`Cannot specify 'permit' along side 'action' at the same time.`)
	})

	test("should throw an error if 'deny' and 'permit' are specified along side with 'action'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				deny: 1,
				action: "permit"
			})
		}).toThrowError()
	})

	test("should throw an error if 'deny' and 'permit' are specified at the same time", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				permit: 1
			})
		}).toThrowError(`Cannot specify 'deny' along side 'permit' at the same time.`)
	})
})

export default suite
