function parseArguments(options) {
	options = options || {};

	// HACK для webpack, аргументы не используются для браузеров, а вебпак слишком много
	// ругается на эту либу
	// eslint-disable-next-line no-eval
	const yargs = eval("require(\"yargs\")");

	let parser = yargs;
	if (options.options) {
		parser = parser
			.parserConfiguration({
				"camel-case-expansion": false,
				"dot-notation": false,
				"boolean-negation": false
			})
			.options(options.options);
	}

	const s = process.argv.slice(2).join(" ");
	let args = parser.parse(s);

	if (options.convert) {
		args = options.convert(args);
	}

	return args;
}

module.exports = parseArguments;
