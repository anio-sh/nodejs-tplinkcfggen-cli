import context from "../dummy_context.mjs"

export default {
	label: "any to any test cases",
	tests: [
		{
			label: "source=any destination=any protocol=none action=deny logging=false",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "any:any",
					protocol: "none",
					action: "deny",
					logging: false
				}
			},
			output: `access-list ip 550 rule 1111 deny logging disable`
		},
		{
			label: "source=any destination=any protocol=none action=deny logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "any:any",
					protocol: "none",
					action: "deny",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 deny logging enable`
		},
		{
			label: "source=any destination=any protocol=none action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "any:any",
					protocol: "none",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable`
		},
		{
			label: "source=any destination=any protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:any",
					destination: "any:any",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable protocol 6`
		},
		{
			label: "source=any:ssh destination=any protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:ssh",
					destination: "any:any",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable protocol 6 s-port 22 s-port-mask ffff`
		},
		{
			label: "source=any:ssh destination=any:http protocol=tcp action=permit logging=true",
			input: {
				context,
				rule: {
					source: "any:ssh",
					destination: "any:http",
					protocol: "tcp",
					action: "permit",
					logging: true
				}
			},
			output: `access-list ip 550 rule 1111 permit logging enable protocol 6 d-port 80 d-port-mask ffff s-port 22 s-port-mask ffff`
		}
	]
}
