const { getLogDir, doubleDigit } = require("./helpers");
const os = require('os');
const fs = require('fs');
const path = require('path');

/**
 * Closure for storing settings
 * Configured using setters and getters
 */
function createSettings() {
    appName = null;

    return {
        setAppName: function(appName) {
            this.appName = appName
            return this.appName;
        },
        getAppName: function(appName) {
            return this.appName;
        }
    }
}
const settings = createSettings();

/**
 * Simple Logger
 * @param {string} type - type of logging, accepts: `info`, `warn`, `error`, `debug`
 * @param {string} message - message to be logged
 */
exports.log = function (message, type) {
    if (settings.getAppName() === null) {
        throw new Error("App name must be set first!");
    }

    type = type || 'info';

    const date = new Date();
    const logName = `${date.getFullYear()}_${doubleDigit(date.getMonth() + 1)}_${doubleDigit(date.getDate())}.log`;
    // choose log directory dependig on os
    const logDir = getLogDir(settings.getAppName());
    const logPath = path.join(logDir, logName);

    // appends time to the beginning
    message = `(${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}:${doubleDigit(date.getSeconds())}:${doubleDigit(date.getMilliseconds())}): ` + message + '\n';

    // appends logging type to the beginning
    // info is default
    if (type === 'warn') {
        message = `[WARN] ` + message;
    } else if (type === 'error') {
        message = `[ERROR] ` + message;
    } else if (type === 'debug') {
        message = `[DEBUG] ` + message;
    } else {
        message = `[INFO] ` + message;
    }

    // append new line at the beginning
    message = '\n' + message;

    // handle logging calling context
    let logLineDetails = ((new Error().stack).split("at ")[2]).trim();
    // get rid of full path, and leave only `function name (filename:line:column)`
    logLineDetails = logLineDetails.replace(/\/.+\//, "");
    message = '### ' + logLineDetails + ' ###' + message + '\n';

    // appends a message to log file, creates new if none exists
    fs.appendFile(logPath, message, 'utf-8', (err) => {
    });
}

/**
 * This module allows you to set logging settings
 * @param {string} appName 
 */
exports.setSettings = function ({
    appName
}) {
    settings.setAppName(appName);
}

/**
 * This module allows you to initialize loggin directory
 * @param {string} appName 
 */
exports.initialize = function () {
    const appDir = path.join(os.homedir(), settings.getAppName());
	const logDir = path.join(appDir, "logs");
	fs.access(appDir, (err) => {
		if (err) { 
			fs.mkdir(appDir, () => {
				fs.mkdir(logDir, () => {

                });
			});
		} else {
			fs.access(logDir, (err) => {
				if (err)  {
                    fs.mkdir(logDir, () => {
                    });
                }
			})
		}
	});
}