const _ = require("lodash");
const moment = require("moment");

const isNode = require("./tools/isNode");

const Application = require("./Application");
const ApplicationComponent = require("./ApplicationComponent");

const defaultApp = {
	isNode: require("./tools/isNode"),
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
		math: require("./tools/math"),
		delay: require("./tools/delay"),
		time: require("./tools/time"),
		json: require("./tools/json"),
		hash: require("./tools/hash")
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
			path: require("./tools/path")
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

	const log = require("./tools/log");
	application.log = log(options.log);

	if (isNode) {
		const argumentsParser = require("./arguments");
		application.arguments = argumentsParser(options.arguments);
	}

	application.enums = {
		...application.enums,
		...options.enums
	};

	_.merge(application, {
		constants: options.constants,
		libs: options.libs,
		tools: options.tools
	});

	if (isNode) {
		let loadConfig = _.get(options, "config", true);
		if (loadConfig) {
			application.config = ndapp.tools.json.load(application.constants.CONFIG_PATH);
		}
	}

	Object.assign(application, options.specials || {});

	(options.components || []).forEach(component => {
		component = _.isFunction(component) ? component() : component;
		application.addComponent(component);
	});

	await application.initialize();
	await application.run();
}

Object.assign(ndapp, defaultApp, defaultSpecials);
global.ndapp = ndapp;

require("./tools/shims");

module.exports = ndapp;
