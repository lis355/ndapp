function parseArguments(options) {
	options = options || {};

	// HACK для webpack, аргументы не используются для браузеров, а вебпак слишком много
	// ругается на эту либу
	// eslint-disable-next-line no-eval
	const yargs = eval("require(\"yargs\")");

	let parser = yargs;
	options.options = options.options || {};
	const parserOptions = {
		...options.options,
		config: {
			type: "string",
			default: "",
			coerce: ndapp.tools.path.fromRelativePathToAbsolutePath
		}
	};

	parser = parser
		.parserConfiguration({
			"camel-case-expansion": false,
			"dot-notation": false,
			"boolean-negation": false
		})
		.options(parserOptions);

	const s = process.argv.slice(2).join(" ");
	let args = parser.parse(s);

	if (options.convert) {
		args = {
			...options.convert(args),
			config: args.config
		};
	}

	return args;
}

module.exports = parseArguments;
