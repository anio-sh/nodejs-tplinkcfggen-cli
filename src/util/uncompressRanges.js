module.exports = function(ranges_str) {
	const pairs = ranges_str.split(",")
	let values = []

	for (const pair of pairs) {
		const tmp = pair.split("-")

		// just a number
		if (tmp.length === 1) {
			values.push(parseInt(pair, 10))
		}
		// start-end notation
		else if (tmp.length === 2) {
			const start = parseInt(tmp[0], 10)
			const end = parseInt(tmp[1], 10)

			if (start >= end) {
				throw new Error(`Invalid range '${pair}'.`)
			}

			for (let i = start; i <= end; ++i) {
				values.push(i)
			}
		}
		// error
		else {
			throw new Error(`Invalid pair '${pair}'.`)
		}
	}

	values.sort((a, b) => {
		return a - b
	})

	return values
}
