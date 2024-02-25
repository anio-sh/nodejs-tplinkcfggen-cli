import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: logging_enable_log", () => {
	test("should throw an error if 'enable_log' is specified along side with 'logging'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				logging: true
			})
		}).toThrowError(`Cannot specify 'enable_log' along side 'logging' at the same time.`)
	})

	test("should throw an error if 'disable_log' is specified along side with 'logging'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				disable_log: 1,
				logging: false
			})
		}).toThrowError(`Cannot specify 'disable_log' along side 'logging' at the same time.`)
	})

	test("should throw an error if 'enable_log' and 'disable_log' are specified along side with 'logging'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				disable_log: 1,
				logging: true
			})
		}).toThrowError()
	})

	test("should throw an error if 'enable_log' and 'disable_log' are specified at the same time", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				enable_log: 1,
				disable_log: 1
			})
		}).toThrowError(`Cannot specify 'enable_log' along side 'disable_log' at the same time.`)
	})
})

export default suite
