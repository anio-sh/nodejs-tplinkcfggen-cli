import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: logging_enable_log", () => {
	test("should throw an error if 'enable_log' is specified along side with 'logging'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				logging: true
			})
		}, {
			message: "Cannot specify 'enable_log' along side 'logging' at the same time."
		})
	})

	test("should throw an error if 'disable_log' is specified along side with 'logging'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				disable_log: 1,
				logging: false
			})
		}, {
			message: "Cannot specify 'disable_log' along side 'logging' at the same time."
		})
	})

	test("should throw an error if 'enable_log' and 'disable_log' are specified along side with 'logging'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				disable_log: 1,
				logging: true
			})
		})
	})

	test("should throw an error if 'enable_log' and 'disable_log' are specified at the same time", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				disable_log: 1
			})
		}, {
			message: "Cannot specify 'enable_log' along side 'disable_log' at the same time."
		})
	})
})

export default suite
