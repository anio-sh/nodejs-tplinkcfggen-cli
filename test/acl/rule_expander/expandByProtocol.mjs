export default {
	implementation: "byProtocol",

	cases: [{
		label: "should expand properly given multiple protocols",

		input: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: ["udp", "tcp"]
		}],

		output: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}, {
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "tcp"
		}]
	}, {
		label: "should expand single protocol correctly (1)",

		input: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: ["udp"]
		}],

		output: [{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		}]
	}, {
		label: "should expand single protocol correctly (2)",

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
	}]
}
