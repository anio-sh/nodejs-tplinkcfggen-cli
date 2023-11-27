export default {
	file: "./src/acl/rule_expander/byDestinationPorts.mjs",

	cases: [{
		label: "should expand destination with multiple ports correctly",

		input: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24:ssh,http",
			protocol: "udp",
		}],

		output: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24:ssh",
			protocol: "udp"
		},{
			source: "10.0.0.1",
			destination: "192.168.0.1/24:http",
			protocol: "udp"
		}]
	}, {
		label: "should expand destination with 'any' port correctly",

		input: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}]
	}, {
		label: "should expand destination with one port correctly",

		input: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24:ssh",
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24:ssh",
			protocol: "udp"
		}]
	}, {
		label: "should expand source with one port correctly",

		input: [{
			source: "10.0.0.1:23",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1:23",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}]
	}, {
		label: "should throw for source with multiple ports",

		input: [{
			source: "10.0.0.1:23,80",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}],

		throws: "Source port can only be 'any' or a single port."
	}]
}
