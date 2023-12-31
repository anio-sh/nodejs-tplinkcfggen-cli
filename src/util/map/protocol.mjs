import IntegerMap from "./_IntegerMap.mjs"

const known_protocols = new IntegerMap({
	"icmp": 1,
	"igmp": 2,
	"tcp": 6,
	"udp": 17
}, "protocol")

export function mapProtocolNameToInteger(protocol_name) {
	return known_protocols.mapNameToInteger(protocol_name)
}

export function mapIntegerToProtocolName(protocol_value) {
	return known_protocols.mapIntegerToName(protocol_value)
}
