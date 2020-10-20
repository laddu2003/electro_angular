"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeLog = void 0;
var os = require("os");
var log = require("electron-log");
function writeLog(level, message) {
    var date = new Date();
    var month = (date.getMonth() + 1).toString();
    var strDate = date.getDate().toString();
    if (Number(month) >= 1 && Number(month) <= 9) {
        month = "0" + month;
    }
    if (Number(strDate) >= 0 && Number(strDate) <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + "-" + month + "-" + strDate;
    var ul = os.homedir() + "\\AppData\\Roaming\\angular-electron-autoUpdater\\logs\\";
    console.log(ul);
    log.transports.file.file = ul + currentdate + ".txt";
    log.transports.file.level = false;
    log.transports.console.level = false;
    log.transports.file.level = "silly";
    log.transports.console.level = "silly";
    if (level == "error") {
        log.error(message);
    }
    else if (level == "warn") {
        log.warn(message);
    }
    else if (level == "debug") {
        log.debug(message);
    }
    else {
        log.info(message);
    }
}
exports.writeLog = writeLog;
//# sourceMappingURL=electron-log.js.map