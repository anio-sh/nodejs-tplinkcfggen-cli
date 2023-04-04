const context = require("../dummy_context.js")

module.exports = {
	label: "host to any test cases",
	tests: [
		{
			label: "source=192.168.0.2 destination=any protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			output: `access-list ip 550 rule 1111 deny logging disable sip 192.168.0.2 sip-mask 255.255.255.255`
		},
		{
			label: "source=192.168.0.2 destination=any protocol=none action=deny logging=true",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any",
					protocol: "none",
					action: "deny",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 deny logging enable sip 192.168.0.2 sip-mask 255.255.255.255`
		},
		{
			label: "source=192.168.0.2 destination=any protocol=none action=permit logging=true",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any",
					protocol: "none",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable sip 192.168.0.2 sip-mask 255.255.255.255`
		},
		{
			label: "source=192.168.0.2 destination=any protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "192.168.0.2",
					destination: "any",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable sip 192.168.0.2 sip-mask 255.255.255.255 protocol 6`
		},
		{
			label: "source=192.168.0.2:ssh destination=any protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "192.168.0.2:ssh",
					destination: "any",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable sip 192.168.0.2 sip-mask 255.255.255.255 protocol 6 s-port 22 s-port-mask ffff`
		},
		{
			label: "source=192.168.0.2:ssh destination=any:http protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "192.168.0.2:ssh",
					destination: "any:http",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable sip 192.168.0.2 sip-mask 255.255.255.255 protocol 6 d-port 80 d-port-mask ffff s-port 22 s-port-mask ffff`
		}
	]
}
