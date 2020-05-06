const ndapp = require("../index");

ndapp(async () => {
	app.log.info("Hello! " + app.moment(app.time).format("DD.MM.YYYY HH:mm"));
});
