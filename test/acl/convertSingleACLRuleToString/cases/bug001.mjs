import context from "../dummy_context.mjs"

export default {
	label: "Bug #001: throw error if source/destination ports given with incompatible protocol",
	tests: [
		// source port
		{
			label: "source=192.168.0.2:ssh destination=any protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2:ssh",
					destination: "any",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify source port with incompatible protocol 'none'."
		},
		{
			label: "source=192.168.0.2:ssh destination=any protocol=icmp action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2:ssh",
					destination: "any",
					protocol: "icmp",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify source port with incompatible protocol 'icmp'."
		},

		// destination port
		{
			label: "source=192.168.0.2 destination=any:ssh protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any:ssh",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify destination port with incompatible protocol 'none'."
		},
		{
			label: "source=192.168.0.2 destination=any:ssh protocol=icmp action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any:ssh",
					protocol: "icmp",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify destination port with incompatible protocol 'icmp'."
		},

		// source and destination ports
		{
			label: "source=192.168.0.2:http destination=any:ssh protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2:http",
					destination: "any:ssh",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify source and destination port with incompatible protocol 'none'."
		},
		{
			label: "source=192.168.0.2:http destination=any:ssh protocol=icmp action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2:http",
					destination: "any:ssh",
					protocol: "icmp",
					action: "deny",
					logging: false
				}
			},
			throws: "Cannot specify source and destination port with incompatible protocol 'icmp'."
		}
	]
}
