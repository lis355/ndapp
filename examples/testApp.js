const ndapp = require("../index");

class App extends ndapp.Application {
	async run() {
		await super.run();

		app.log.info("Hello!");
	}
}

ndapp({
	app: new App(),
	config: false
});
