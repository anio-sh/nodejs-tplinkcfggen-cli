let cases = [
	await import("./cases/any_to_any.mjs"),
	await import("./cases/any_to_host.mjs"),
	await import("./cases/any_to_net.mjs"),
	await import("./cases/host_to_any.mjs"),
	await import("./cases/host_to_host.mjs"),
	await import("./cases/host_to_net.mjs"),
	await import("./cases/bug001.mjs")
].map(c => c.default)

export default cases
