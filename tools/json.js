const isNode = require("./isNode");

function format(json, spaces = "\t") {
	return JSON.stringify(json, null, spaces);
}

function parse(str) {
	return JSON.parse(str);
}

const jsonTools = {
	format,
	parse

};

if (isNode) {
	const fs = require("fs-extra");

	jsonTools.save = function (path, json, spaces = "\t") {
		fs.outputJsonSync(path, json, { spaces });
	};

	jsonTools.load = function (path) {
		return fs.readJsonSync(path);
	};
}

module.exports = jsonTools;
