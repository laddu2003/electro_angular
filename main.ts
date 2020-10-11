import {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  screen,
  Tray,
  remote,
  globalShortcut,
} from "electron";
import * as path from "path";
import * as url from "url";
import * as auto_Updater from "electron-updater";
const { autoUpdater } = auto_Updater;
let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === "--serve");
let isQuitting = false;
function createWindow(): BrowserWindow {
  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      // allowRunningInsecureContent: serve ? true : false,
      // enableRemoteModule: true, // true if you want to run 2e2 test or use remote module in renderer context (ie. Angular)
    },
  });

  if (serve) {
    win.webContents.openDevTools();

    require("electron-reload")(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`),
    });
    win.loadURL("http://localhost:4200");
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, "dist/index.html"),
        protocol: "file:",
        slashes: true,
      })
    );
  }

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}
const dispatch = (data) => {
  win.webContents.send("message", data);
};
// load all event after client app load
ipcMain.on("client-app-load", (e, option) => {
  console.log(option);

  win.webContents.send("version", app.getVersion());
  autoUpdater.checkForUpdatesAndNotify();
});
ipcMain.on("miniMizeApp", (e, options) => {
  BrowserWindow.getFocusedWindow().minimize();
});
ipcMain.on("maximize", (e, options) => {
  BrowserWindow.getFocusedWindow().maximize();
});
ipcMain.on("miniClose", (e, options) => {
  BrowserWindow.getFocusedWindow().close();
  // win.on("close", (e) => {
  //   console.log("miniClose");
  //   if (!isQuitting) {
  //     e.preventDefault();
  //     win.hide();
  //   }
  //   return true;
  // });
});
ipcMain.on("relaunch", (e, options) => {
  app.relaunch();
  app.exit(0);
  console.log("relaunch");
});

let tray;
var actionCenter = (currenWindowRunning) => {
  currenWindowRunning.on("close", (e) => {
    currenWindowRunning.hide();
    if (!isQuitting) {
      e.preventDefault();
    }
    return true;
  });

  const tryIcon = `${__dirname}/icon/tray_icon.png`;
  tray = new Tray(tryIcon);
  tray.on("click", () => {
    if (currenWindowRunning.isVisible() === true) {
      currenWindowRunning.hide();
    } else {
      currenWindowRunning.show();
    }
  });
  tray.on("right-click", () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          isQuitting = true;
          win = null;
          app.quit();
        },
      },
    ]);
    tray.popUpContextMenu(contextMenu);
  });
};

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  // app.on("ready", () => setTimeout(createWindow, 400));
  app.on("ready", () => {
    // globalShortcut.register("Control+Shift+I", () => {
    //   //this will get call for Control+Shift+I.
    //   return false;
    // });

    setTimeout(() => {
      createWindow();
      actionCenter(win);
      console.log("app version", app.getVersion());

      // win.webContents.send("version", "Sunle bhai");
    }, 400);
  });
  // Quit when all windows are closed.
  app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

// auto update

autoUpdater.on("checking-for-update", () => {
  console.log("Checking for update...");
  dispatch("checking-for-update");
});

autoUpdater.on("update-available", (info) => {
  console.log("Update available.");
  dispatch("update-available");
});

autoUpdater.on("update-not-available", (info) => {
  console.log("Update not available.");
  dispatch("update-not-available");
});

autoUpdater.on("error", (err) => {
  console.log("Error in auto-updater. " + err);
  dispatch("Error in auto-updater.");
});

autoUpdater.on("download-progress", (progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  // dispatch(log_message)
  win.webContents.send("download-progress", progressObj.percent);
  console.log("download-progress", progressObj.percent);
});

autoUpdater.on("update-downloaded", (info) => {
  console.log("Update downloaded");
  dispatch("Update downloaded");
});
