const isNumericString = require("../isNumericString.js")

module.exports = function(map, label) {
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
