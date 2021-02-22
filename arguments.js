const yargs = require("yargs-parser");

function parseArguments(options) {
	options = options || {};

	let parser = yargs;
	options.options = options.options || {};
	const parserOptions = {
		...options.options,
		config: {
			type: "string",
			default: ""
		},
		configuration: {
			"camel-case-expansion": false,
			"dot-notation": false,
			"boolean-negation": false
		}
	};

	const s = process.argv.slice(2).join(" ");
	let args = parser(s, parserOptions);

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
