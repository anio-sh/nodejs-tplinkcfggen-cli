import getAlphabetAsArray from "../util/getAlphabetAsArray.mjs"

let allowed_characters = [
	...getAlphabetAsArray(),
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	"-", "@", "_", ":", "/", ".", " "
]

export default function(location) {
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
