const os = require('os');
const path = require('path');

/**
 * Gets a home directory of specific os
 */
exports.getLogDir = (appName) => path.join(os.homedir(), appName, "logs");

/**
 * Appends 0 to beginning of digits if its' single digited
 * @param {string} digits 
 */
exports.doubleDigit = (digits) => digits < 10 ? '0' + digits : digits;