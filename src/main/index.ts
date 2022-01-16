import path from 'path';
import {  BrowserWindow, app } from 'electron';
// import { searchDevtools } from 'electron-search-devtools';
import remoteMain from '@electron/remote/main';
import { join } from "path";
import { pathToFileURL } from "url";
import { handleWindowEvent } from './ipc/windowContrl';

remoteMain.initialize();

const isDev = process.env.NODE_ENV === 'development';

/// #if DEBUG
const execPath =
  process.platform === 'win32'
    ? '../node_modules/electron/dist/electron.exe'
    : '../node_modules/.bin/electron';

if (isDev) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('electron-reload')(__dirname, {
    electron: path.resolve(__dirname, execPath),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}
/// #endif

app.whenReady().then(async () => {
  const mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    backgroundColor: '#535457',
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
    mainWindow.loadURL(
      pathToFileURL(join(__dirname, "./renderer/index.html")).toString()
    );
  }
  remoteMain.enable(mainWindow.webContents);
  handleWindowEvent(mainWindow);
});

