const md5 = require("md5");

module.exports = function (str) {
	return md5(str);
};
