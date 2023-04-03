module.exports = {
	file: "./src/acl/rule_expander/bySourceAndDestination.js",

	cases: [{
		label: "should expand one-to-one relationship correctly",

		input: [{
			source: "10.0.0.1",
			destination: "10.0.0.1/24",
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1",
			destination: "10.0.0.1/24",
			protocol: "udp"
		}]
	}, {
		label: "should expand one-to-many (one source -> multiple destination) relationship correctly",

		input: [{
			source: "10.0.0.1",
			destination: [
				"10.0.0.1/24",
				"192.168.0.1/24",
				"10.1.2.3/32:ssh"
			],
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1",
			destination: "10.0.0.1/24",
			protocol: "udp"
		},{
			source: "10.0.0.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		},{
			source: "10.0.0.1",
			destination: "10.1.2.3/32:ssh",
			protocol: "udp"
		}]
	}, {
		label: "should expand many-to-one (many sources -> one destination) relationship correctly",

		input: [{
			source: ["10.0.0.1/24", "10.0.0.2/24:ssh", "10.0.0.3/32"],
			destination: "any",
			protocol: "udp"
		}],

		output: [{
			source: "10.0.0.1/24",
			destination: "any",
			protocol: "udp"
		}, {
			source: "10.0.0.2/24:ssh",
			destination: "any",
			protocol: "udp"
		}, {
			source: "10.0.0.3/32",
			destination: "any",
			protocol: "udp"
		}]
	}, {
		label: "should expand map relationship correctly",

		input: [{
			source: ["10.0.1.1", "192.168.1.1", "10.1.2.1"],
			destination: ["10.0.0.1/24", "192.168.0.1/24", "10.1.2.3/32:ssh"],
			protocol: "udp"
		}],

		output: [{
			source: "10.0.1.1",
			destination: "10.0.0.1/24",
			protocol: "udp"
		},{
			source: "192.168.1.1",
			destination: "192.168.0.1/24",
			protocol: "udp"
		},{
			source: "10.1.2.1",
			destination: "10.1.2.3/32:ssh",
			protocol: "udp"
		}]
	}, {
		label: "should throw an error if map relationship is unbalanced",

		input: [{
			source: ["10.0.1.1", "192.168.1.1", "10.1.2.1"],
			destination: ["10.0.0.1/24", "192.168.0.1/24"],
			protocol: "udp"
		}],

		throws: "map relationship not balanced 3 (src) != 2 (dst)."
	}]
}
