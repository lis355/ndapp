/**
 * Second timer
 */
class Timer {
	constructor() {
		this.reset();
	}

	reset() {
		this.ts = process.hrtime();
	}

	/**
	 * Time from start in seconds
	 */
	time() {
		const t = process.hrtime(this.ts);
		const s = t[0] + t[1] / 10 ** 9;
		return s;
	}
}

module.exports = {
	Timer
};
