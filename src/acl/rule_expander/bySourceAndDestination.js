module.exports = function(rules) {
	let ret = []

	for (const rule of rules) {
		const src = rule.source
		const dst = rule.destination

		// rule has a one-to-one relationship
		// source -> destination
		if (!Array.isArray(src) && !Array.isArray(dst)) {
			ret.push(rule)
		}
		// rule has a one-to-many relationship (one source, multiple destinations)
		// source -> destination1
		// source -> destination2
		else if (!Array.isArray(src) && Array.isArray(dst)) {
			for (let i = 0; i < dst.length; ++i) {
				ret.push({
					...rule,
					destination: dst[i]
				})
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
				})
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
				})
			}
		}
		else {
			throw new Error(`Unknown source/destination relationship`)
		}
	}

	return ret
}
