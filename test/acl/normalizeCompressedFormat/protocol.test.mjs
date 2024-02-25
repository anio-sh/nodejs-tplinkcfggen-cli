import {createTestSuite} from "joytest/suite"
const {test, describe, suite} = createTestSuite(import.meta.url)

import normalizeCompressedFormat from "../../../src/acl/normalizeCompressedFormat.mjs"

describe("acl:normalizeCompressedFormat: protocol", () => {
	test("should return a new rule with the correct protocol (1)", (expect) => {
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

	test("should return a new rule with the correct protocol (2)", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				protocol: "none"
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

	test("should return a new rule with the correct protocol (3)", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				protocol: "tcp"
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "tcp",
				action: "deny",
				logging: false
			}
		)
	})

	test("should return the correct rule when 'tcp' is specified", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				tcp: 1
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: "tcp",
				action: "deny",
				logging: false
			}
		)
	})

	test("should return the correct rule when 'tcp' and 'udp' are specified at the same time", (expect) => {
		expect(
			normalizeCompressedFormat({
				source: "src",
				destination: "dst",
				tcp: 1,
				udp: 1
			})
		).toEqual(
			{
				source: "src",
				destination: "dst",
				protocol: ["tcp", "udp"],
				action: "deny",
				logging: false
			}
		)
	})
})

export default suite
