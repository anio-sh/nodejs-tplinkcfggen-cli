let alphabet = []

for (let i = 65; i <= 90; ++i) {
	alphabet.push(String.fromCharCode(i))
}

for (let i = 97; i <= 122; ++i) {
	alphabet.push(String.fromCharCode(i))
}

export default function() {
	return alphabet
}
