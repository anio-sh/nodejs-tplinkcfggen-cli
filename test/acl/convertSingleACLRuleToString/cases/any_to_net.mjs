import context from "../dummy_context.mjs"

export default {
	label: "any to network test cases",
	tests: [
		{
			label: "source=any destination=192.168.2.1/24 protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "192.168.2.1/24",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			output: `access-list ip 550 rule 1111 deny logging disable dip 192.168.2.1 dip-mask 255.255.255.0`
		},
		{
			label: "source=any destination=192.168.2.1/24 protocol=none action=deny logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "192.168.2.1/24",
					protocol: "none",
					action: "deny",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 deny logging enable dip 192.168.2.1 dip-mask 255.255.255.0`
		},
		{
			label: "source=any destination=192.168.2.1/24 protocol=none action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "192.168.2.1/24",
					protocol: "none",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable dip 192.168.2.1 dip-mask 255.255.255.0`
		},
		{
			label: "source=any destination=192.168.2.1/24 protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "192.168.2.1/24",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable dip 192.168.2.1 dip-mask 255.255.255.0 protocol 6`
		},
		{
			label: "source=any:ssh destination=192.168.2.1/24 protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:ssh",
					destination: "192.168.2.1/24",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable dip 192.168.2.1 dip-mask 255.255.255.0 protocol 6 s-port 22 s-port-mask ffff`
		},
		{
			label: "source=any:ssh destination=192.168.2.1/24:http protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:ssh",
					destination: "192.168.2.1/24:http",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable dip 192.168.2.1 dip-mask 255.255.255.0 protocol 6 d-port 80 d-port-mask ffff s-port 22 s-port-mask ffff`
		}
	]
}
