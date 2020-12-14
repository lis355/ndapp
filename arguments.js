const yargs = require("yargs");

function parseArguments(options) {
	options = options || {};

	let parser = yargs;
	options.options = options.options || {};
	const parserOptions = {
		...options.options,
		config: {
			type: "string",
			default: ""
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

	const config = args.config;

	if (options.convert) {
		args = options.convert(args);
	}

	if (config) {
		args.config = config;
	}

	return args;
}

module.exports = parseArguments;
