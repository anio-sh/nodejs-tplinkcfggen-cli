import {createTestSuite} from "anio-jtest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: protocol_tcp_udp", () => {
	test("should throw an error if 'tcp' is specified along side with 'protocol'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				tcp: 1,
				protocol: "tcp"
			})
		}).toThrowError(`Cannot specify 'tcp' along side 'protocol' at the same time.`)
	})

	test("should throw an error if 'udp' is specified along side with 'protocol'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				udp: 1,
				protocol: "udp"
			})
		}).toThrowError(`Cannot specify 'udp' along side 'protocol' at the same time.`)
	})

	test("should throw an error if 'udp' and 'tcp' are specified along side with 'protocol'", (expect) => {
		expect(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				udp: 1,
				tcp: 1,
				protocol: "udp"
			})
		}).toThrowError()
	})
})

export default suite
