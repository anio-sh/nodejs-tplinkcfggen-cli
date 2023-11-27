export default function(value) {
	if (Array.isArray(value)) return value

	return [value]
}
