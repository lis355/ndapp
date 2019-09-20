const fs = require("fs-extra");

function format(json, spaces = "\t") {
	return JSON.stringify(json, null, spaces);
}

function parse(str) {
	return JSON.parse(str);
}

function save(path, json, spaces = "\t") {
	fs.outputJsonSync(path, json, { spaces });
}

function load(path) {
	return fs.readJsonSync(path);
}

module.exports = {
	format,
	parse,
	save,
	load
};
