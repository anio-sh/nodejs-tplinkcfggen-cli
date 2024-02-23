export default {
	type: "app:cli",

	language: "js",

	deployment: {
		to: "anio.sh",

		config: {
			file_name: "tplinkcfggen"
		}
	},

	test: {
		input: ["/test/"]
	}
}
