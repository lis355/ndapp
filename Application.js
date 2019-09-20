const _ = require("lodash");

module.exports = class Application {
	constructor() {
		this.components = [];

		process.on("uncaughtException", error => {
			app.log.error(error.stack);

			this.quit();
		});

		process.on("unhandledRejection", error => {
			app.log.error(error.stack);

			this.quit();
		});
	}

	addComponent(component) {
		this.components.push(component);
		this[_.camelCase(component.constructor.name)] = component;
	}

	async initialize() {
		for (let i = 0; i < this.components.length; i++) {
			await this.components[i].initialize();

			// app.log.info(`${this.components[i].constructor.name} initialized`);
		}
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

	exit() {
		process.exit(0);
	}
};
