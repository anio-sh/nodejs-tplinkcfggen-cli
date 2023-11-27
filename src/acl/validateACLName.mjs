import getAlphabetAsArray from "../util/getAlphabetAsArray.mjs"

let allowed_characters = [
	...getAlphabetAsArray(),
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
	".", "/", "-", "_", "@", " "
]

export default function(name) {
	const error_str = `UserInputError: The ACL name is invalid, only characters 0-9, a-z, A-Z, ./-_@: and blank space are allowed, and the length should be 1-32.`

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
