export default function(values) {
	let copy = JSON.parse(JSON.stringify(values)).sort((a, b) => {
		return a - b
	})
	let sequence_start = null
	let sequence_members = 0
	let sequences = []

	for (let i = 0; i < copy.length; ++i) {
		let current = copy[i]

		if (sequence_start === null) {
			//process.stderr.write(`Not in a sequence, starting with ${current}\n`)

			sequence_start = current
			sequence_members = 1
		} else {
			const sequence_expected = sequence_start + sequence_members

			//process.stderr.write(`In a sequence 'start=${sequence_start},expected=${sequence_expected}', but does ${current} fit?\n`)

			if (sequence_expected === current) {
			//	process.stderr.write(`Yes it does\n`)

				sequence_members++
			} else {
			//	process.stderr.write(`No it does not\n`)
			//	process.stderr.write(`Saving sequence\n`)

				sequences.push({
					start: sequence_start,
					end: sequence_start + sequence_members - 1
				})

			//	process.stderr.write(`Not in a sequence, starting with ${current}\n`)

				sequence_start = current
				sequence_members = 1
			}
		}
	}

	if (sequence_start !== null) {
		sequences.push({
			start: sequence_start,
			end: sequence_start + sequence_members - 1
		})
	}

	let tmp = []

	for (const seq of sequences) {
		if (seq.start === seq.end) {
			tmp.push(seq.start)
		} else {
			tmp.push(`${seq.start}-${seq.end}`)
		}
	}

	return tmp.join(",")
}
