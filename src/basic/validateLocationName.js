const getAlphabetAsArray = require("../util/getAlphabetAsArray.js")

let allowed_characters = [
	...getAlphabetAsArray(),
	"-", "@", "_", ":", "/", ".", " "
]

module.exports = function(location) {
	const error_str = `UserInputError: The system location only allows letters, numbers and some special symbols: -@_:/. and the length should not be more than 32 characters!`

	if (location.length > 32 || !location.trim().length) {
		throw new Error(error_str)
	}

	for (const char of location) {
		if (!allowed_characters.includes(char)) {
			throw new Error(`${error_str}\nOffending character is '${char}' in '${location}'.`)
		}
	}
}
