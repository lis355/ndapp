const isNode = require("detect-node");

const _ = require("lodash");
const moment = require("moment");

const Application = require("./Application");
const ApplicationComponent = require("./components/ApplicationComponent");

const defaultApp = {
	enums: {
	},
	constants: {
	},
	libs: {
		enum: require("./tools/enum"),
		_,
		moment
	},
	tools: {
		delay: require("./tools/delay"),
		time: require("./tools/time")
	}
};

const defaultSpecials = {
	enum: defaultApp.libs.enum,
	moment: defaultApp.libs.moment,
	Application,
	ApplicationComponent
};

if (isNode) {
	const path = require("path");
	const os = require("os");
	const fs = require("fs-extra");

	_.merge(defaultApp, {
		constants: {
			"CONFIG_PATH": path.join(process.cwd(), "config.json")
		},
		libs: {
			path,
			os,
			fs
		},
		tools: {
			json: require("./tools/json"),
			hash: require("./tools/hash"),
		}
	});

	_.merge(defaultSpecials, {
		path: defaultApp.libs.path,
		os: defaultApp.libs.os,
		fs: defaultApp.libs.fs
	});
}

async function ndapp(options) {
	options = options || {};

	const application = Object.assign(options.app || new ndapp.Application(), ndapp);
	global.app = application;

	if (isNode) {
		const argumentsParser = require("./arguments");
		const log = require("./tools/log");

		application.arguments = argumentsParser(options.arguments);
		application.log = log(options.log);

		let loadConfig = _.get(options, "config", true);
		if (loadConfig) {
			application.config = ndapp.tools.json.load(application.constants.CONFIG_PATH);
		}
	}

	_.merge(application, {
		enums: options.enums,
		constants: options.constants,
		libs: options.libs,
		tools: options.tools
	});

	Object.assign(application, options.specials || {});

	(options.components || []).forEach(component => {
		component = typeof component === "function" ? component() : component;
		application.addComponent(component);
	});

	await application.initialize();
	await application.run();
}

Object.assign(ndapp, defaultApp, defaultSpecials);
global.ndapp = ndapp;

require("./tools/patching");

module.exports = ndapp;
