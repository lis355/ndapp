const ndapp = require("../index");

ndapp(async () => {
	app.log.info("Hello! " + app.time.format("DD.MM.YYYY HH:mm"));
});
