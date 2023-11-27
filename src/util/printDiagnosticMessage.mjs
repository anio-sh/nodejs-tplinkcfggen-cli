import process from "node:process"

export default function(msg) {
	process.stderr.write(`${msg}\n`)
}
