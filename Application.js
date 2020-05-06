const _ = require("lodash");
const moment = require("moment");

const isNode = require("./tools/isNode");

module.exports = class Application {
	constructor() {
		this.initialized = false;

		this.components = [];

		if (isNode) {
			process.on("uncaughtException", error => { this.onUncaughtException(error); });
			process.on("unhandledRejection", error => { this.onUnhandledRejection(error); });

			const defaultErrorHandler = error => {
				if (this.log) {
					this.log.error(error.stack);
				} else {
					console.error(error);
				}

				this.quit();
			};

			this.onUncaughtException = defaultErrorHandler;
			this.onUnhandledRejection = defaultErrorHandler;
		}
	}

	addComponent(component) {
		this.components.push(component);
		this[_.camelCase(component.constructor.name)] = component;
	}

	async initialize() {
		if (this.initialized) {
			app.log.error("Calling initialize twise or more");
		}

		for (let i = 0; i < this.components.length; i++) {
			await this.components[i].initialize();

			// app.log.info(`${this.components[i].constructor.name} initialized`);
		}

		this.initialized = true;
	}

	async run() {
		for (let i = 0; i < this.components.length; i++) {
			await this.components[i].run();

			// app.log.info(`${this.components[i].constructor.name} runned`);
		}
	}

	async quit() {
		for (let i = 0; i < this.components.length; i++) {
			await this.components[i].exit();
		}

		this.exit();
	}

	get time() {
		return moment();
	}

	exit() {
		if (isNode) {
			process.exit(0);
		}
	}
};
