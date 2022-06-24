import { app, BrowserWindow } from 'electron';
import path from 'path';
import { configProcess } from './process/config';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
    },
  });
  win.loadFile('./build/index.html');
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
};
if (!app.isPackaged) {
  require('electron-reload')(__dirname, {
    electron: require('path').join(
      __dirname,
      '..',
      '..',
      'node_modules',
      '.bin',
      'electron'
    ),
    forceHardReset: true,
    hardResetMethod: 'exit',
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then(() => {
  createWindow();
  configProcess();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
