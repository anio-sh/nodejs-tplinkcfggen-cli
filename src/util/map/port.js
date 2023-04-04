const IntegerMap = require("./_IntegerMap.js")

const known_ports = new IntegerMap({
	"ftp": [20,21],
	"ssh": 22,
	"telnet": 23,
	"dns": 53,
	"dhcp.server": 67,
	"dhcp.client": 68,
	"http": 80,
	"ntp": 123,
	"https": 443
}, "port")

module.exports = {
	mapPortNameToInteger(port_name) {
		return known_ports.mapNameToInteger(port_name)
	},

	mapIntegerToPortName(port_value) {
		return known_ports.mapIntegerToName(port_value)
	}
}
