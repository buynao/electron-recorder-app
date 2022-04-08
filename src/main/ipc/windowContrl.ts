
import {  BrowserWindow, ipcMain, app } from 'electron';

export function handleWindowEvent(winodw: BrowserWindow) {
  ipcMain.on('window-close', () => {
    app.quit();
  });
  ipcMain.on('window-minimize', () => {
    console.log('window-minimize');
    winodw.minimize();
  });
  ipcMain.on('window-maximize', () => {
    console.log('window-maximize');
    winodw.setFullScreen(true);
  });
  ipcMain.on('window-unmaximize', () => {
    console.log('window-unmaximize');
    winodw.setFullScreen(false);
  });
}