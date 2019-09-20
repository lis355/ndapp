const moment = require("moment");

function format() {
    return time.format("DD/MM/YYYY HH:mm:ss");
}

function formatDuration(duration) {
    return moment.utc(duration.asMilliseconds()).format("HH:mm:ss:SSS");
}

// Parse duration hours-minutes-seconds "10m 5s" "10s" "1M 3S"
function parseDuration(s) {
    return moment.duration(`PT${s.replace(/\s+/g, "").toUpperCase()}`);
}

function now() {
    return moment();
}

function toUnix(time) {
    return time.unix();
}

function nowUnix() {
    return toUnix(now());
}

function fromUnix(timeUnix) {
    return moment.unix(timeUnix);
}

class Timer {
    constructor() {
        this.startTime = moment().valueOf();
    }

    // time from start in seconds
    time() {
        const time = moment().valueOf() - this.startTime;
        return time / 1000;
    }
}

module.exports = {
    format,
    formatDuration,
    parseDuration,
    now,
    toUnix,
    nowUnix,
    fromUnix,
    Timer
};
