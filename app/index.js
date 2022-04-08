var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/main/index.ts
var import_path = __toModule(require("path"));
var import_electron2 = __toModule(require("electron"));
var import_main = __toModule(require("@electron/remote/main"));
var import_path2 = __toModule(require("path"));
var import_url = __toModule(require("url"));

// src/main/ipc/windowContrl.ts
var import_electron = __toModule(require("electron"));
function handleWindowEvent(winodw) {
  import_electron.ipcMain.on("window-close", () => {
    import_electron.app.quit();
  });
  import_electron.ipcMain.on("window-minimize", () => {
    console.log("window-minimize");
    winodw.minimize();
  });
  import_electron.ipcMain.on("window-maximize", () => {
    console.log("window-maximize");
    winodw.setFullScreen(true);
  });
  import_electron.ipcMain.on("window-unmaximize", () => {
    console.log("window-unmaximize");
    winodw.setFullScreen(false);
  });
}

// src/main/index.ts
import_main.default.initialize();
console.log("init");
var isDev = process.env.NODE_ENV === "development";
var execPath = process.platform === "win32" ? "../node_modules/electron/dist/electron.exe" : "../node_modules/.bin/electron";
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: import_path.default.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: "exit"
  });
}
import_electron2.app.whenReady().then(async () => {
  const mainWindow = new import_electron2.BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: "#535457",
    transparent: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.toggleDevTools();
  } else {
    mainWindow.loadURL((0, import_url.pathToFileURL)((0, import_path2.join)(__dirname, "./renderer/index.html")).toString());
  }
  import_main.default.enable(mainWindow.webContents);
  handleWindowEvent(mainWindow);
});
//# sourceMappingURL=index.js.map
