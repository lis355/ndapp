const isNode = require("./isNode");

const moment = require("moment");

/**
 * Second timer
 */
class Timer {
	constructor() {
		this.reset();
	}

	reset() {
		this.ts = isNode ? process.hrtime() : moment().valueOf();
	}

	/**
	 * Time from start in seconds
	 */
	time() {
		if (isNode) {
			const t = process.hrtime(this.ts);
			const s = t[0] + t[1] / 10 ** 9;
			return s;
		} else {
			return (moment() - this.ts) / 1000;
		}
	}
}

module.exports = {
	Timer
};
