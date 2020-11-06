const isNode = require("./isNode");

const moment = require("moment");
const stackTrace = require("stack-trace");
const _ = require("lodash");

const Enum = require("./enum");

const LOG_LEVELS = new Enum([
	"INFO",
	"WARNING",
	"ERROR"
]);

const GROUP_COMMON = "common";
const LOGS_MAX = 50;

class Logger {
	constructor(logsHistoryLength = LOGS_MAX) {
		this.logsHistoryLength = logsHistoryLength;
		this.messages = [];
		this.listeners = [];

		LOG_LEVELS.all.forEach(level => {
			this[_.lowerCase(level)] = (message, group) => this.log(level, group, message);
		});
	}

	get history() {
		return this.messages;
	}

	log(level, group, text) {
		level = level || LOG_LEVELS.INFO;
		group = group || GROUP_COMMON;
		text = text || "";

		const time = +moment();

		text = text.toString();

		const message = {
			time,
			level,
			group,
			text
		};

		this.messages.push(message);

		while (this.messages.length > this.logsHistoryLength) {
			this.messages.shift();
		}

		this.listeners.forEach(callback => { callback(message); });
	}

	addListener(callback) {
		if (!this.listeners.includes(callback)) {
			this.listeners.push(callback);
		}
	}

	removeListener(callback) {
		var index = this.listeners.indexOf(callback);
		if (index > -1) {
			this.listeners.splice(index, 1);
		}
	}
}

class LoggerTextListener {
	static convertMessageToText(message) {
		const header = [message.level];

		if (message.group !== GROUP_COMMON) {
			header.push(message.group);
		}

		header.push(moment(message.time).format("DD.MM.YYYY HH:mm:ss:SSS"));

		const logString = `[${header.join(" | ")}]: ${message.text} (${LoggerConsoleListener.getTraceInfo(7)})`;
		return logString;
	}

	static getTraceInfo(depth) {
		const trace = stackTrace.get();

		const functionName = trace[depth].getFunctionName();
		const fileName = trace[depth].getFileName();
		const lineNumber = trace[depth].getLineNumber();
		const columnNumber = trace[depth].getColumnNumber();

		return `${functionName} at ${fileName.replace(process.cwd(), "")}:${lineNumber}:${columnNumber}`;
	}
}

class LoggerConsoleListener extends LoggerTextListener {
	constructor() {
		super();

		this.consoleOutputGroup = null;
	}

	handleMessage(message) {
		if (this.consoleOutputGroup && message.group !== this.consoleOutputGroup) return;

		const text = LoggerTextListener.convertMessageToText(message);
		const processor = message.level === LOG_LEVELS.ERROR ? console.error : console.log;
		processor(text);
	}

	setConsoleLogGroupFilter(group) {
		this.consoleOutputGroup = group;
	}
}

let LoggerFileListener;
if (isNode) {
	const fs = require("fs-extra");
	const path = require("path");
	const os = require("os");

	LoggerFileListener = class extends LoggerTextListener {
		constructor(logPath) {
			super();

			logPath = logPath || path.join(process.cwd(), "log.txt");

			const logDirectory = path.dirname(logPath);
			app.fs.removeSync(logDirectory);
			app.fs.ensureDirSync(logDirectory);

			this.logStream = fs.createWriteStream(logPath, { flags: "a" });
		}

		handleMessage(message) {
			const text = LoggerTextListener.convertMessageToText(message);
			this.logStream.write(text + os.EOL);
		}
	};
}

function loggerCreator(options) {
	options = options || {};

	const logger = new Logger(options.logsHistoryLength);

	const loggerConsoleListener = new LoggerConsoleListener();

	logger.addListener(loggerConsoleListener.handleMessage.bind(loggerConsoleListener));
	logger.setConsoleLogGroupFilter = loggerConsoleListener.setConsoleLogGroupFilter.bind(loggerConsoleListener);

	if (isNode && options.file) {
		if (options.file === true) options.file = null;

		const loggerFileListener = new LoggerFileListener(options.file);

		logger.addListener(loggerFileListener.handleMessage.bind(loggerFileListener));
	}

	logger.LOG_LEVELS = LOG_LEVELS;
	logger.GROUP_COMMON = GROUP_COMMON;

	return logger;
}

module.exports = loggerCreator;
