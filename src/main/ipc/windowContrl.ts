
import {  BrowserWindow, ipcMain, app } from 'electron';

export function handleWindowEvent(winodw: BrowserWindow) {
  ipcMain.on('window-close', () => {
    app.quit();
  });
  ipcMain.on('window-minimize', () => {
    winodw.minimize();
  });
  ipcMain.on('window-maximize', () => {
    winodw.setFullScreen(true);
  });
  ipcMain.on('window-unmaximize', () => {
    winodw.setFullScreen(false);
  });
}