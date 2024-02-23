#!/usr/bin/env -S node --experimental-detect-module
await (async () => {
	const process = await import("node:process")

	if (process.argv.length !== 3) {
		return
	} else if (process.argv[2] !== "--anio-gyp-info") {
		return
	}

	process.stderr.write(`Created with anio-gyp version v0.11.0 and with @anio-gyp/utilities v0.12.2.\n\n`)
	process.stderr.write(`Bundle id is daf6bda560ee19fbce1cfa5a9bfd75b1d9f5eb40.\n`)

	process.stderr.write(`\n`)

	process.stderr.write("This app does not include any bundled resources." + "\n")

	process.exit()
})();

#!/usr/bin/env -S node --experimental-detect-module
import fs$1 from 'node:fs';
import fs from 'node:fs/promises';
import process from 'node:process';

/**
 * Converts IPv4 string format `a.b.c.d` into uint32.
 */
function IPv4StringToUInt32$2(ip_str) {
	const octets = ip_str.split(".");
	let num = 0;

	for (let i = 0; i < 4; ++i) {
		const octet = parseInt(octets[i], 10);
		const n_shift = (3 - i) * 8;

		num |= (octet << n_shift);
	}

	return num >>> 0
}

/**
 * Converts 32bit integer `num` to IPv4 string format `a.b.c.d`
 */
function UInt32ToIPv4String$1(num) {
	const binary_string = (num >>> 0).toString(2).padStart(32, "0");
	let octets = [];

	for (let i = 0; i < 4; ++i) {
		const octet_slice = binary_string.slice(8 * i, 8 * (i + 1));
		const octet = parseInt(octet_slice, 2);

		octets.push(octet);
	}

	return octets.join(".")
}

function createSubnetMask$1(n) {
	n = parseInt(n, 10);

	const ones = "1".repeat(n);
	const zeros = "0".repeat(32 - n);

	return parseInt(`${ones}${zeros}`, 2) >>> 0
}

function invertSubnetMask(n) {
	return (n ^ 0xFFFFFFFF) >>> 0
}

function mask(ip, mask) {
	return (ip & mask) >>> 0
}

function parseIPv4String$1(ip_str) {
	const tmp = ip_str.split("/");

	if (tmp.length > 2) {
		throw new Error(`Invalid IPv4 string '${ip_str}'.`)
	} else if (tmp.length === 1) {
		return parseIPv4String$1(`${ip_str}/32`)
	}

	const submask = createSubnetMask$1(tmp[1]);
	const host = mask(
		IPv4StringToUInt32(tmp[0]), invertSubnetMask(submask)
	);
	const network = mask(
		IPv4StringToUInt32(tmp[0]), submask
	);

	return {network, host, submask}
}

/* Warning! This file was automatically created! */

const IPv4StringToUInt32$1 = IPv4StringToUInt32$2;
const UInt32ToIPv4String = UInt32ToIPv4String$1;
const parseIPv4String = parseIPv4String$1;

let saved_global_context = {};

function saveGlobalContext(context) {
	const vars = Object.keys(context);

	for (const varname of vars) {
		saved_global_context[varname] = globalThis[varname];
	}
}

function restoreGlobalContext(context) {
	const vars = Object.keys(saved_global_context);

	for (const varname of vars) {
		globalThis[varname] = saved_global_context[varname];
	}
}

async function loadConfigFile(config_file_path) {
	const context = {
		tcp: "tcp",
		udp: "udp",
		deny: "deny",
		permit: "permit",
		any: "any",

		UInt32ToIPv4String,
		IPv4StringToUInt32: IPv4StringToUInt32$1,
		parseIPv4String
	};

	globalThis.udp = "hi";

	saveGlobalContext(context);

	for (const k in context) {
		globalThis[k] = context[k];
	}

	// realpath needed because import() wouldn't work otherwise
	const config = (await import(
		await fs.realpath(config_file_path)
	)).default;

	restoreGlobalContext();

	return config
}

let alphabet = [];

for (let i = 65; i <= 90; ++i) {
	alphabet.push(String.fromCharCode(i));
}

for (let i = 97; i <= 122; ++i) {
	alphabet.push(String.fromCharCode(i));
}

function getAlphabetAsArray() {
	return alphabet
}

let allowed_characters$1 = [
	...getAlphabetAsArray(),
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"-", "@", "_", ":", "/", ".", " "
];

function validateLocationName(location) {
	const error_str = `UserInputError: The system location only allows letters, numbers and some special symbols: -@_:/. and the length should not be more than 32 characters!`;

	if (location.length > 32 || !location.trim().length) {
		throw new Error(error_str)
	}

	for (const char of location) {
		if (!allowed_characters$1.includes(char)) {
			throw new Error(`${error_str}\nOffending character is '${char}' in '${location}'.`)
		}
	}
}

function convert_basic(device_config) {
	validateLocationName(device_config.location);

	let str = ``;

	str += `#\n`;
	str += `hostname \"${device_config.hostname}\"\n`;
	str += `location \"${device_config.location}\"\n`;
	str += `contact-info "${device_config.contact_info}"\n`;
	str += `serial_port baud_rate ${device_config.serial_port.baudrate}\n`;
	str += `#\n`.repeat(10);
	str += `system-time ntp UTC+01:00 133.100.9.2 139.78.100.163 12\n`;
	str += `no system-time dst\n`;
	str += `#\n`.repeat(5);
	str += `mac address-table vlan-security mode drop\n`;

	if ("users" in device_config) {
		for (let user of device_config.users) {
			str += `user name ${user.username} privilege admin password 0 ${user.password}\n`;
		}
	} else if ("username" in device_config && "password" in device_config) {
		str += `user name ${device_config.username} privilege admin password 0 ${device_config.password}\n`;
	}

	str += `telnet disable\n`;
	str += `no service reset-disable\n`;
	str += `#\n`.repeat(10);
	str += `no snmp-server\n`;
	str += `no controller cloud-based\n`;
	str += `#\n`.repeat(10);

	return str
}

function convert_vlan(device_config) {
	if (!("vlan" in device_config)) {
		return ""
	}

	let str = `\n`;

	// declare vlans
	for (const vlan of device_config.vlan) {
		str += `vlan ${vlan.id}\n`;
		str += ` name "${vlan.label}"\n\n`;
	}

	// declare vlan interfaces
	for (const vlan of device_config.vlan) {
		if (!("interface" in vlan)) continue

		str += `interface vlan ${vlan.id}\n`;

		if (vlan.interface.type === "static") {
			str += `  ip address ${vlan.interface.ip} ${vlan.interface.mask}\n`;
			str += `  description "static_interface"\n`;
		} else if (vlan.interface.type === "dhcp") {
			str += `  ip address-alloc dhcp\n`;
			str += `  description "dhcp_interface"\n`;
		} else {
			throw new Error(`Unknown interface type '${vlan.interface.type}'`)
		}

		str += `  no ipv6 enable\n\n`;
	}

	return str
}

function isString(value) {
	return Object.prototype.toString.call(value) === `[object String]`
}

function compressIntoRanges(values) {
	let copy = JSON.parse(JSON.stringify(values)).sort((a, b) => {
		return a - b
	});
	let sequence_start = null;
	let sequence_members = 0;
	let sequences = [];

	for (let i = 0; i < copy.length; ++i) {
		let current = copy[i];

		if (sequence_start === null) {
			//process.stderr.write(`Not in a sequence, starting with ${current}\n`)

			sequence_start = current;
			sequence_members = 1;
		} else {
			const sequence_expected = sequence_start + sequence_members;

			//process.stderr.write(`In a sequence 'start=${sequence_start},expected=${sequence_expected}', but does ${current} fit?\n`)

			if (sequence_expected === current) {
			//	process.stderr.write(`Yes it does\n`)

				sequence_members++;
			} else {
			//	process.stderr.write(`No it does not\n`)
			//	process.stderr.write(`Saving sequence\n`)

				sequences.push({
					start: sequence_start,
					end: sequence_start + sequence_members - 1
				});

			//	process.stderr.write(`Not in a sequence, starting with ${current}\n`)

				sequence_start = current;
				sequence_members = 1;
			}
		}
	}

	if (sequence_start !== null) {
		sequences.push({
			start: sequence_start,
			end: sequence_start + sequence_members - 1
		});
	}

	let tmp = [];

	for (const seq of sequences) {
		if (seq.start === seq.end) {
			tmp.push(seq.start);
		} else {
			tmp.push(`${seq.start}-${seq.end}`);
		}
	}

	return tmp.join(",")
}

function uncompressRanges(ranges_str) {
	const pairs = ranges_str.split(",");
	let values = [];

	for (const pair of pairs) {
		const tmp = pair.split("-");

		// just a number
		if (tmp.length === 1) {
			values.push(parseInt(pair, 10));
		}
		// start-end notation
		else if (tmp.length === 2) {
			const start = parseInt(tmp[0], 10);
			const end = parseInt(tmp[1], 10);

			if (start >= end) {
				throw new Error(`Invalid range '${pair}'.`)
			}

			for (let i = start; i <= end; ++i) {
				values.push(i);
			}
		}
		// error
		else {
			throw new Error(`Invalid pair '${pair}'.`)
		}
	}

	values.sort((a, b) => {
		return a - b
	});

	return values
}

function convert_port(device_config) {
	if (!("port" in device_config)) {
		return ""
	}

	const vlanNameToID = (vlan_name) => {
		if (!("vlan" in device_config)) {
			return vlan_name
		} else if (!isString(vlan_name)) {
			return vlan_name
		}

		for (const tmp of device_config.vlan) {
			if (tmp.label === vlan_name) {
				return tmp.id
			}
		}

		throw new Error(`No such vlan '${vlan_name}'.`)
	};

	let str = ``;

	for (const port_name of Object.keys(device_config.port)) {
		str += `\ninterface ${port_name}\n`;

		let port_info = device_config.port[port_name];

		// check alias
		if (typeof port_info === "string") {
			port_info = device_config.port[port_info];
		}

		const mode = Array.isArray(port_info.vlan) ? "trunk" : "access";

		if (mode === "trunk") {
			const vlan_ids = port_info.vlan.map(vlanNameToID);

			const vlan_ids_compressed = compressIntoRanges(vlan_ids);
			const vlan_ids_uncompressed = uncompressRanges(vlan_ids_compressed);

			if (JSON.stringify(vlan_ids_uncompressed) !== JSON.stringify(vlan_ids)) {
				throw new Error(`Compressed range does not equal the original range (internal error).`)
			}

			str += `  switchport general allowed vlan ${vlan_ids_compressed} tagged\n`;

			if (!("pvid" in port_info)) {
				throw new Error(`pvid required for trunk ports.`)
			}

			str += `  switchport pvid ${vlanNameToID(port_info.pvid)}\n`;
		} else {
			str += `  switchport general allowed vlan ${vlanNameToID(port_info.vlan)} untagged\n`;
			str += `  switchport pvid ${vlanNameToID(port_info.vlan)}\n`;
		}

		// disallow VLAN 1
		str += `  no switchport general allowed vlan 1\n\n`;
	}

	return str
}

function arrayify(value) {
	if (Array.isArray(value)) return value

	return [value]
}

/**
 * This function normalizes the input consisting of compressed ACL rules.
 * The output is still in compressed format, but normalized (e.g. "tcp", "udp" properties are removed)
 */

function normalizeCompressedFormat(input) {
	if ("action" in input) {
		// deny and/or permit must not be passed along side 'action'
		if ("deny" in input) {
			throw new Error(`Cannot specify 'deny' along side 'action' at the same time.`)
		} else if ("permit" in input) {
			throw new Error(`Cannot specify 'permit' along side 'action' at the same time.`)
		}
	} else {
		if ("deny" in input && "permit" in input) {
			throw new Error(`Cannot specify 'deny' along side 'permit' at the same time.`)
		}
	}

	if ("protocol" in input) {
		// udp and/or tcp must not be passed along side 'protocol'
		if ("udp" in input) {
			throw new Error(`Cannot specify 'udp' along side 'protocol' at the same time.`)
		} else if ("tcp" in input) {
			throw new Error(`Cannot specify 'tcp' along side 'protocol' at the same time.`)
		}
	}

	if ("logging" in input) {
		// enable_log and/or disable_log must not be passed along side 'logging'
		if ("enable_log" in input) {
			throw new Error(`Cannot specify 'enable_log' along side 'logging' at the same time.`)
		} else if ("disable_log" in input) {
			throw new Error(`Cannot specify 'disable_log' along side 'logging' at the same time.`)
		}
	} else {
		if ("enable_log" in input && "disable_log" in input) {
			throw new Error(`Cannot specify 'enable_log' along side 'disable_log' at the same time.`)
		}
	}

	let normalized = {
		// source+destination remain unchanged
		source: input.source,
		destination: input.destination,
		// default values
		protocol: "none",
		action: "deny",
		logging: false
	};

	let specified_protocols = [];

	if ("protocol" in input && input.protocol !== "none") {
		specified_protocols = arrayify(input.protocol);
	} else {
		if ("tcp" in input) {
			specified_protocols.push("tcp");
		}

		if ("udp" in input) {
			specified_protocols.push("udp");
		}
	}

	if (specified_protocols.length > 1) {
		normalized.protocol = specified_protocols;
	} else if (specified_protocols.length === 1) {
		normalized.protocol = specified_protocols[0];
	}

	if ("action" in input && input.action === "permit") {
		normalized.action = "permit";
	} else {
		if ("permit" in input) {
			normalized.action = "permit";
		}
	}

	if ("logging" in input) {
		normalized.logging = !!input.logging;
	} else {
		if ("enable_log" in input) {
			normalized.logging = true;
		} else if ("disable_log" in input) {
			normalized.logging = false;
		}
	}

	return normalized
}

function expandRulesBySourceAndDestination(rules) {
	let ret = [];

	for (const rule of rules) {
		const src = rule.source;
		const dst = rule.destination;

		// rule has a one-to-one relationship
		// source -> destination
		if (!Array.isArray(src) && !Array.isArray(dst)) {
			ret.push(rule);
		}
		// rule has a one-to-many relationship (one source, multiple destinations)
		// source -> destination1
		// source -> destination2
		else if (!Array.isArray(src) && Array.isArray(dst)) {
			for (let i = 0; i < dst.length; ++i) {
				ret.push({
					...rule,
					destination: dst[i]
				});
			}
		}
		// rule has a map relationship (one source for each destintation)
		// source1 -> destination1
		// source2 -> destination2
		else if (Array.isArray(src) && Array.isArray(dst)) {
			if (src.length !== dst.length) {
				throw new Error(`map relationship not balanced ${src.length} (src) != ${dst.length} (dst).`)
			}

			for (let i = 0; i < src.length; ++i) {
				ret.push({
					...rule,
					source: src[i],
					destination: dst[i]
				});
			}
		}
		// rule has a one-to-many relationship but inverted (multiple sources, one destination)
		// source1 -> destination
		// source2 -> destination
		else if (Array.isArray(src) && !Array.isArray(dst)) {
			for (let i = 0; i < src.length; ++i) {
				ret.push({
					...rule,
					source: src[i],
					destination: dst
				});
			}
		}
		else {
			throw new Error(`Unknown source/destination relationship`)
		}
	}

	return ret
}

/**
 * Creates a subnet mask from CIDR slash notation:
 * 
 * createSubnetMask(24) returns "255.255.255.0"
 * 
 * createSubnetMask(32) returns "255.255.255.255" etc.
 */
function createSubnetMask(n) {
	if (n > 32 || 0 > n) {
		throw new Error(`Invalid value for n=${n} (min=0,max=32)`)
	}

	let mask_str = "1".repeat(n);

	mask_str += "0".repeat(32 - n);

	let chunks = mask_str.match(/.{1,8}/g);

	chunks = chunks.map(chunk => {
		return parseInt(chunk, 2)
	});

	return chunks.join(".")
}

function isNumericString(str) {
	if (!isString(str)) {
		throw new Error(`isNumericString called on non-string variable.`)
	} else if (!str.length) {
		return false
	}

	const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

	for (let i = 0; i < str.length; ++i) {
		if (!digits.includes(str[i])) {
			return false
		}
	}

	return true
}

function validateIP(ip_addr_str) {
	if (!isString(ip_addr_str)) {
		throw new Error(`validateRawIPv4Format called on non-string variable.`)
	}

	const octets = ip_addr_str.split(".");

	if (octets.length !== 4) {
		throw new Error(`Invalid number of octets in IPv4Address '${ip_addr_str}'.`)
	}

	for (const octet of octets) {
		if (!isNumericString(octet)) {
			throw new Error(`Found non-numeric octect '${octet}' in IPv4Address '${ip_addr_str}'.`)
		}

		const octet_value = parseInt(octet, 10);

		if (octet_value > 255) {
			throw new Error(`Octet value '${octet_value}' is out of range in IPv4Address '${ip_addr_str}'.`)
		}
	}
}

function IntegerMap(map, label) {
	return {
		mapIntegerToName(int_value) {
			for (const key in map) {
				if (map[key] === int_value) {
					return key
				}
			}

			if (isNumericString(`${int_value}`)) {
				return `${int_value}`
			}

			throw new Error(`Unknown ${label} '${int_value}'.`)
		},

		mapNameToInteger(name) {
			// if name is a numeric string, parse it and return the value
			if (isNumericString(name)) {
				return parseInt(name, 10)
			}

			if (name in map) {
				return map[name]
			}

			throw new Error(`Unknown ${label} '${name}'.`)
		}
	}
}

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
}, "port");

function mapPortNameToInteger(port_name) {
	return known_ports.mapNameToInteger(port_name)
}

function mapIntegerToPortName(port_value) {
	return known_ports.mapIntegerToName(port_value)
}

/**
 * Formats:
 * 
 * 10.0.0.1       -> assumed mask 255.255.255.255
 * 10.0.0.1/24    -> mask set by slash notation (255.255.255.0)
 * 
 * 10.0.0.1:80    -> assumed mask 255.255.255.255 port 80
 * 10.0.0.1/24:80 -> assumed mask 255.255.255.0 port 80
 */

function parseIPWithSlashNotation(ip_addr_str) {
	const is_any_ip_addr = ip_addr_str.slice(0, 3) === "any";

	let ip = is_any_ip_addr ? "0.0.0.0" : ip_addr_str;
	let subnet_mask = is_any_ip_addr ? "0.0.0.0" : "255.255.255.255";

	// check for slash "/" notation
	if (ip_addr_str.indexOf("/") >= 0) {
		// throw error if ip starts with "any"
		if (is_any_ip_addr) {
			throw new Error(`Cannot specify subnet mask for 'any' ip address.`)
		}

		let tmp = ip_addr_str.split("/");

		ip = tmp[0];
		subnet_mask = createSubnetMask(parseInt(tmp[1], 10));
	}

	validateIP(ip);

	return {
		ip,
		subnet_mask
	}
}

function parseACLTargetNotation(ip_addr_str) {
	if (ip_addr_str.trim() === "" || ip_addr_str === "any") {
		return {
			"ip": "0.0.0.0",
			"subnet_mask": "0.0.0.0",
			"ports": "any"
		}
	}

	let ip_with_possible_slash_notation = ip_addr_str;
	let ports = "any";

	// check for dot ":" notation (ports)
	if (ip_addr_str.indexOf(":") >= 0) {
		let tmp = ip_addr_str.split(":");

		ip_with_possible_slash_notation = tmp[0];

		// ports could be "any", handle this case here
		if (tmp[1] === "any") {
			ports = "any";
		} else {
			// map ports
			const mapped_ports = tmp[1].split(",").map(mapPortNameToInteger);

			ports = [];

			// go through ports and destructure multiple ports
			// for example: ftp returns [20,21] instead of a single port
			for (let port of mapped_ports) {
				if (Array.isArray(port)) {
					ports.push(...port);
				} else {
					ports.push(port);
				}
			}
		}
	}

	return {
		...parseIPWithSlashNotation(
			ip_with_possible_slash_notation
		),
		ports
	}
}

/**
 * Counts the leading bits of a subnet mask:
 * 
 * 255.255.255.0   -> 24
 * 255.255.255.255 -> 32
 */

function countLeadingSubMaskBits(subnet_mask_str) {
	if (!isString(subnet_mask_str)) {
		throw new Error(`countLeadingSubMaskBits called on non-string variable.`)
	}

	const octets_binary_str = subnet_mask_str.split(".").map(octet => {
		return parseInt(octet, 10).toString(2)
	}).join("");


	return octets_binary_str.split("").filter(ch => {
		return ch === "1"
	}).length
}

function expandRulesByDestinationPorts(rules) {
	let ret = [];

	for (const rule of rules) {
		const src = parseACLTargetNotation(rule.source);
		const dst = parseACLTargetNotation(rule.destination);

		let more_than_one_src_port = true;

		if (src.ports === "any") more_than_one_src_port = false;
		if (Array.isArray(src.ports) && src.ports.length === 1) more_than_one_src_port = false;

		if (more_than_one_src_port) {
			throw new Error(`Source port can only be 'any' or a single port.`)
		}

		if (dst.ports === "any") {
			ret.push(rule);
		} else if (Array.isArray(dst.ports) && dst.ports.length === 1) {
			ret.push(rule);
		} else if (Array.isArray(dst.ports)) {
			for (let i = 0; i < dst.ports.length; ++i) {
				let leading_bits = countLeadingSubMaskBits(dst.subnet_mask);
				let port = mapIntegerToPortName(dst.ports[i]);

				ret.push({
					...rule,
					destination: `${dst.ip}/${leading_bits}:${port}`
				});
			}
		}
	}

	return ret
}

function expandRulesByProtocol(rules) {
	let ret = [];

	for (const rule of rules) {
		const protocols = arrayify(rule.protocol);

		if (protocols.length === 1) {
			ret.push({
				...rule,
				protocol: protocols[0]
			});
		} else {
			for (let i = 0; i < protocols.length; ++i) {
				ret.push({
					...rule,
					protocol: protocols[i]
				});
			}
		}
	}

	return ret
}

function rule_expander(rules) {
	let expanded_rules = expandRulesBySourceAndDestination(rules);

	expanded_rules = expandRulesByDestinationPorts(expanded_rules);

	return expandRulesByProtocol(expanded_rules)
}

const known_protocols = new IntegerMap({
	"icmp": 1,
	"igmp": 2,
	"tcp": 6,
	"udp": 17
}, "protocol");

function mapProtocolNameToInteger(protocol_name) {
	return known_protocols.mapNameToInteger(protocol_name)
}

function validateSingleACLRule({context, normalized_rule, source, destination}) {
	let incompatible_protocol_by_src = false;
	let incompatible_protocol_by_dst = false;

	if (source.ports !== "any") {
		if (source.ports.length > 1) {
			throw new Error(`Cannot specify multiple source ports for this function. This is an internal error/bug!`)
		}

		if (normalized_rule.protocol !== "udp" && normalized_rule.protocol !== "tcp") {
			incompatible_protocol_by_src = true;
		}
	}

	if (destination.ports !== "any") {
		if (destination.ports.length > 1) {
			throw new Error(`Cannot specify multiple destination ports for this function. This is an internal error/bug!`)
		}

		if (normalized_rule.protocol !== "udp" && normalized_rule.protocol !== "tcp") {
			incompatible_protocol_by_dst = true;
		}
	}

	if (incompatible_protocol_by_src && incompatible_protocol_by_dst) {
		throw new Error(
			`Cannot specify source and destination port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	} else if (incompatible_protocol_by_src) {
		throw new Error(
			`Cannot specify source port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	} else if (incompatible_protocol_by_dst) {
		throw new Error(
			`Cannot specify destination port with incompatible protocol '${normalized_rule.protocol}'.`
		)
	}
}

function convertSingleACLRuleToString(context, normalized_rule) {
	let parts = [];

	parts.push(`access-list ip ${context.acl_id} rule ${context.rule_id} ${normalized_rule.action}`);

	// handle logging parameter
	if (normalized_rule.logging) {
		parts.push(`logging enable`);
	} else {
		// is required!
		parts.push(`logging disable`);
	}

	const source = parseACLTargetNotation(normalized_rule.source);
	const destination = parseACLTargetNotation(normalized_rule.destination);

	validateSingleACLRule({
		context,
		normalized_rule,
		source,
		destination
	});

	// add source ip (if source ip isn't "any")
	if (!(source.ip === "0.0.0.0" && source.subnet_mask === "0.0.0.0")) {
		parts.push(`sip ${source.ip} sip-mask ${source.subnet_mask}`);
	}

	// add destination ip (if destination ip isn't "any")
	if (!(destination.ip === "0.0.0.0" && destination.subnet_mask === "0.0.0.0")) {
		parts.push(`dip ${destination.ip} dip-mask ${destination.subnet_mask}`);
	}

	// handle protocol
	if (normalized_rule.protocol !== "none") {
		parts.push(`protocol ${mapProtocolNameToInteger(normalized_rule.protocol)}`);
	}

	// handle destination port
	if (Array.isArray(destination.ports)) {
		parts.push(`d-port ${destination.ports[0]} d-port-mask ffff`);
	}

	// handle source port
	if (Array.isArray(source.ports)) {
		parts.push(`s-port ${source.ports[0]} s-port-mask ffff`);
	}

	return parts.join(" ")
}

function convertRulesListToString(acl) {
	let parts = [];
	let n_rules = 0;
	let rules = acl.rules.map(normalizeCompressedFormat);

	rules = rule_expander(rules);

	let rule_id = 1000;

	for (const rule of rules) {
		parts.push(
			convertSingleACLRuleToString({
				acl_id: acl.id,
				rule_id
			}, rule)
		);

		rule_id += 10;
		n_rules++;
	}

	return {
		string: parts.join("\n"),
		n_rules
	}
}

let allowed_characters = [
	...getAlphabetAsArray(),
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	".", "/", "-", "_", "@", " "
];

function validateACLName(name) {
	const error_str = `UserInputError: The ACL name is invalid, only characters 0-9, a-z, A-Z, ./-_@: and blank space are allowed, and the length should be 1-32.`;

	//only characters 0-9, a-z, A-Z, ./-_@: and blank space are allowed
	// and the length should be 1-32.

	if (name.length > 32 || !name.trim().length) {
		throw new Error(error_str)
	}

	for (const char of name) {
		if (!allowed_characters.includes(char)) {
			throw new Error(`${error_str}\nOffending character is '${char}' in '${name}'.`)
		}
	}
}

function convert_acl(device_config) {
	if (!("access_list" in device_config)) {
		// nothing to do here
		return ""
	}

	let parts = [];
	let current_acl_id = 500;

	for (const access_list of device_config.access_list) {
		validateACLName(access_list.name);

		parts.push(`access-list create ${current_acl_id} name "${access_list.name}"`);

		// always overwrite acl id (i.e. use current_acl_id)
		const {string, n_rules} = convertRulesListToString({
			...access_list,
			id: current_acl_id
		});

		// push acl rules string to output string array
		parts.push(string);

		if ("bind_to" in access_list) {
			for (const port of arrayify(access_list.bind_to)) {
				parts.push(`access-list bind ${current_acl_id} interface ${port}`);
			}
		}

		//printDiagnosticMessage(`create acl with id='${current_acl_id}', name='${access_list.name}' and with ${n_rules} rules`)

		current_acl_id += 10;
	}

	return parts.join("\n")
}

function tpLinkConfigGenerator(config) {
	let config_str = "";

	config_str += convert_basic(config);
	config_str += convert_vlan(config);
	config_str += convert_port(config);
	config_str += convert_acl(config);

	let config_lines = config_str.split("\n");

	// prepend configuration lines from config (if specified)
	if ("prepended_configuration_lines" in config) {
		for (const line of arrayify(config.prepended_configuration_lines).reverse()) {
			config_lines.unshift(line);
		}
	}

	// append configuration lines from config (if specified)
	if ("appended_configuration_lines" in config) {
		config_lines.push("");

		for (const line of arrayify(config.appended_configuration_lines)) {
			config_lines.push(line);
		}

		config_lines.push("");
	}

	let clean_config = config_lines.map(line => {
		if (!line.trim().length) {
			return "#"
		}

		return line
	}).join("\n");

	return `${clean_config}\nend\n\x00`
}

if (process.argv.length !== 3) {
	process.stderr.write(
		`Usage: anio_tplinkcfggen <config.mjs>\n`
	);

	process.exit(2);
}

const input_config_file = process.argv[2];

try {
	if (!fs$1.statSync(input_config_file).isFile()) {
		throw new Error()
	}
} catch (error) {
	process.stderr.write(`${input_config_file}: no such file.\n`);
	process.exit(2);
}

try {
	process.stdout.write(
		tpLinkConfigGenerator(
			await loadConfigFile(input_config_file)
		)
	);
} catch (error) {
	if (error.message.startsWith("UserInputError:")) {
		process.stderr.write(error.message + "\n\n");

		process.exit(2);
	}

	throw error
}
