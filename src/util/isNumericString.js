const isString = require("./isString.js")

module.exports = function(str) {
	if (!isString(str)) {
		throw new Error(`isNumericString called on non-string variable.`)
	} else if (!str.length) {
		return false
	}

	const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

	for (let i = 0; i < str.length; ++i) {
		if (!digits.includes(str[i])) {
			return false
		}
	}

	return true
}
