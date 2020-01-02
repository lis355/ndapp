const moment = require("moment");

/**
 * Second timer
 */
class Timer {
	constructor() {
		this.reset();
	}

	reset() {
		this.startTime = moment().valueOf();
	}

	/**
	 * Time from start in seconds
	 */
	time() {
		return (moment() - this.startTime) / 1000;
	}
}

module.exports = {
	Timer
};
