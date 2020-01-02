function isNodeJS() {
	return Object.prototype.toString.call(typeof process !== "undefined" ? process : 0) === "[object process]";
}

const isNode = isNodeJS();

module.exports = isNode;
