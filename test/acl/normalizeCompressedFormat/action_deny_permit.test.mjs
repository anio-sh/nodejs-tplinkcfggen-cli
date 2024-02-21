import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: action_deny_permit", () => {
	test("should throw an error if 'deny' is specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				action: "deny"
			})
		}, {
			message: "Cannot specify 'deny' along side 'action' at the same time."
		})
	})

	test("should throw an error if 'permit' is specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				action: "permit"
			})
		}, {
			message: "Cannot specify 'permit' along side 'action' at the same time."
		})
	})

	test("should throw an error if 'deny' and 'permit' are specified along side with 'action'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				permit: 1,
				deny: 1,
				action: "permit"
			})
		})
	})

	test("should throw an error if 'deny' and 'permit' are specified at the same time", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				deny: 1,
				permit: 1
			})
		}, {
			message: "Cannot specify 'deny' along side 'permit' at the same time."
		})
	})
})

export default suite
