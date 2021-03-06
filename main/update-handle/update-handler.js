"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHandler = void 0;
var electron_updater_1 = require("electron-updater");
var electron_1 = require("electron");
var electron_log_1 = require("../electron-log/electron-log");
function updateHandler(win) {
    if (win == null) {
        return 0;
    }
    console.log("update run");
    var dispatch = function (data) {
        win.webContents.send("message", data);
    };
    var returnData = {
        error: { status: -1, msg: "Detect update query exception" },
        checking: { status: 1, msg: "Checking for app updates" },
        updateAva: {
            status: 2,
            msg: "A new version is detected and is downloading, please wait",
        },
        updateNotAva: {
            status: 0,
            msg: "The version you are using is the latest version, no need to update!",
        },
    };
    electron_updater_1.autoUpdater.checkForUpdates();
    //  अद्यतन त्रुटि
    electron_updater_1.autoUpdater.on("error", function (message) {
        electron_log_1.writeLog("error", returnData.error.msg);
        dispatch("error");
    });
    //  अपडेट्स के लिए जांच हो रही है
    electron_updater_1.autoUpdater.on("checking-for-update", function () {
        electron_log_1.writeLog("warn", returnData.checking.msg);
        electron_log_1.writeLog("message", returnData.checking.msg);
        dispatch("checking-for-update");
    });
    //  नया संस्करण मिला
    electron_updater_1.autoUpdater.on("update-available", function (ev, info) {
        electron_log_1.writeLog("warn", returnData.updateAva.msg);
        electron_log_1.writeLog("message", returnData.updateAva.msg);
        dispatch("update-available");
    });
    //  वर्तमान में नवीनतम संस्करण
    electron_updater_1.autoUpdater.on("update-not-available", function (info) {
        electron_log_1.writeLog("error", returnData.updateNotAva.msg);
        electron_log_1.writeLog("message", returnData.updateNotAva.msg);
        dispatch("update-not-available");
    });
    // अद्यतन पैकेज डाउनलोड प्रगति समय
    electron_updater_1.autoUpdater.on("download-progress", function (progressObj) {
        electron_log_1.writeLog("warn", progressObj);
        electron_log_1.writeLog("downloadProgress", progressObj.percent.toString());
        dispatch("download-progress");
    });
    // अद्यतन पैकेज डाउनलोड होने के बाद एक घटना को ट्रिगर करता है
    electron_updater_1.autoUpdater.on("update-downloaded", function (event, releaseNotes, releaseName, releaseDate) {
        electron_log_1.writeLog("info", "A new version has been downloaded");
        var dialogOpts = {
            buttons: ["shut down", "Later"],
            title: "Version update prompt",
            message: "Install latest update",
            detail: "The new version has been downloaded, please close the program to install the new version!",
        };
        // dialog.showMessageBox()
        dispatch("update-downloaded");
        electron_1.dialog.showMessageBox(dialogOpts).then(function (response) {
            if (response === 0) {
                electron_updater_1.autoUpdater.quitAndInstall();
            }
        });
    });
}
exports.updateHandler = updateHandler;
//# sourceMappingURL=update-handler.js.map