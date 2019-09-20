const minimist = require("minimist");
const buildOptions = require("minimist-options");

function parseArguments(options) {
	options = options || {};

	let args = minimist(process.argv.slice(2), buildOptions(options.options));
	if (options.convert) {
		args = options.convert(args);
	}

	return args;
}

module.exports = parseArguments;
