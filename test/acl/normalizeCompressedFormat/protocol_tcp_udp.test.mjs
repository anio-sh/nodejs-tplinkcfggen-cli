import {createTestSuite} from "@anio-jtest/test"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"
import assert from "assert"

describe("acl:normalizeCompressedFormat: protocol_tcp_udp", () => {
	test("should throw an error if 'tcp' is specified along side with 'protocol'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				tcp: 1,
				protocol: "tcp"
			})
		}, {
			message: "Cannot specify 'tcp' along side 'protocol' at the same time."
		})
	})

	test("should throw an error if 'udp' is specified along side with 'protocol'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				udp: 1,
				protocol: "udp"
			})
		}, {
			message: "Cannot specify 'udp' along side 'protocol' at the same time."
		})
	})

	test("should throw an error if 'udp' and 'tcp' are specified along side with 'protocol'", () => {
		assert.throws(() => {
			normalizeCompressedFormat({
				source: "", destination: "",
				udp: 1,
				tcp: 1,
				protocol: "udp"
			})
		})
	})
})

export default suite
