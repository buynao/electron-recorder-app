const { contextBridge, ipcRenderer, shell } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  shell
});