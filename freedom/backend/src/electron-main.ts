import { app, BrowserWindow } from 'electron';
import { bootstrap } from './main';

bootstrap();
// メインウィンドウはGCされないようにグローバル宣言
let mainWindow: BrowserWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', () => {
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadURL('http://localhost:3000/');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
