import { autoUpdater } from "electron-updater";
import { dialog } from "electron";
import { writeLog } from "../electron-log/electron-log";

export function updateHandler(win?) {
  if (win == null) {
    return 0;
  }
  console.log("update run");
  const dispatch = (data) => {
    win.webContents.send("message", data);
  };
  const returnData = {
    error: { status: -1, msg: "Detect update query exception" },
    checking: { status: 1, msg: "Checking for app updates" },
    updateAva: {
      status: 2,
      msg: "A new version is detected and is downloading, please wait",
    },
    updateNotAva: {
      status: 0,
      msg: `The version you are using is the latest version, no need to update!`,
    },
  };

  autoUpdater.checkForUpdates();

  //  अद्यतन त्रुटि
  autoUpdater.on("error", (message) => {
    writeLog("error", returnData.error.msg);
    dispatch("error");
  });

  //  अपडेट्स के लिए जांच हो रही है
  autoUpdater.on("checking-for-update", () => {
    writeLog("warn", returnData.checking.msg);
    writeLog("message", returnData.checking.msg);
    dispatch("checking-for-update");
  });

  //  नया संस्करण मिला
  autoUpdater.on("update-available", (ev, info) => {
    writeLog("warn", returnData.updateAva.msg);

    writeLog("message", returnData.updateAva.msg);
    dispatch("update-available");
  });

  //  वर्तमान में नवीनतम संस्करण
  autoUpdater.on("update-not-available", (info) => {
    writeLog("error", returnData.updateNotAva.msg);
    writeLog("message", returnData.updateNotAva.msg);
    dispatch("update-not-available");
  });

  // अद्यतन पैकेज डाउनलोड प्रगति समय
  autoUpdater.on("download-progress", (progressObj) => {
    writeLog("warn", progressObj);
    writeLog("downloadProgress", progressObj.percent.toString());
    dispatch("download-progress");
  });

  // अद्यतन पैकेज डाउनलोड होने के बाद एक घटना को ट्रिगर करता है
  autoUpdater.on(
    "update-downloaded",
    (event, releaseNotes, releaseName, releaseDate) => {
      writeLog("info", "A new version has been downloaded");
      const dialogOpts = {
        buttons: ["shut down", "Later"],
        title: "Version update prompt",
        message: "Install latest update",
        detail:
          "The new version has been downloaded, please close the program to install the new version!",
      };
      // dialog.showMessageBox()
      dispatch("update-downloaded");
      dialog.showMessageBox(dialogOpts).then((response: any) => {
        if (response === 0) {
          autoUpdater.quitAndInstall();
        }
      });
    }
  );
}
