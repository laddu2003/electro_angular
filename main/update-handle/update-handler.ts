import { autoUpdater } from "electron-updater";
import { dialog } from "electron";

export function updateHandler(win) {
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
    console.log("error", returnData.error.msg);
    dispatch("error");
  });

  //  अपडेट्स के लिए जांच हो रही है
  autoUpdater.on("checking-for-update", () => {
    console.log("warn", returnData.checking.msg);
    console.log("message", returnData.checking.msg);
    dispatch("checking-for-update");
  });

  //  नया संस्करण मिला
  autoUpdater.on("update-available", (ev, info) => {
    console.log("warn", returnData.updateAva.msg);

    console.log("message", returnData.updateAva.msg);
    dispatch("update-available");
  });

  //  वर्तमान में नवीनतम संस्करण
  autoUpdater.on("update-not-available", (info) => {
    console.log("error", returnData.updateNotAva.msg);
    console.log("message", returnData.updateNotAva.msg);
    dispatch("update-not-available");
  });

  // अद्यतन पैकेज डाउनलोड प्रगति समय
  autoUpdater.on("download-progress", (progressObj) => {
    console.log("warn", progressObj);
    console.log("downloadProgress", progressObj.percent.toString());
    dispatch("download-progress");
  });

  // अद्यतन पैकेज डाउनलोड होने के बाद एक घटना को ट्रिगर करता है
  autoUpdater.on(
    "update-downloaded",
    (event, releaseNotes, releaseName, releaseDate) => {
      console.log("info", "A new version has been downloaded");
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
