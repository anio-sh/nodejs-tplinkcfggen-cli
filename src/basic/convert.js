module.exports = function(device_config) {
	let str = `!TL-SG3210\n`

	str += `#\n`
	str += `hostname \"${device_config.hostname}\"\n`
	str += `location \"${device_config.location}\"\n`
	str += `contact-info "${device_config.contact_info}"\n`
	str += `serial_port baud_rate ${device_config.serial_port.baudrate}\n`
	str += `#\n`.repeat(10)
	str += `system-time ntp UTC+01:00 133.100.9.2 139.78.100.163 12\n`
	str += `no system-time dst\n`
	str += `#\n`.repeat(5)
	str += `mac address-table vlan-security mode drop\n`
	str += `user name ${device_config.username} privilege admin password 0 ${device_config.password}\n`
	str += `telnet disable\n`
	str += `no service reset-disable\n`
	str += `#\n`.repeat(10)
	str += `no snmp-server\n`
	str += `no controller cloud-based\n`
	str += `#\n`.repeat(10)

	return str
}
