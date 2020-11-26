module.exports = class ApplicationComponent {
	constructor() {
		this.initialized = false;
	}

	async initialize() {
		if (!this.initialized) {
			this.initialized = true;
		} else {
			app.log.error("Calling initialize twise or more");
		}
	}

	async run() { }

	async exit(code) { }
};
