const isNode = require("./isNode");

const pathTools = {
};

if (isNode) {
	const path = require("path");

	pathTools.fromRelativePathToAbsolutePath = function (p) {
		return path.join(process.cwd(), p);
	};
}

module.exports = pathTools;
