import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from '@nestjs/platform-express';
import {app,BrowserWindow} from 'electron';
import {join} from 'path'; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'))
  await app.listen(3000);
}
bootstrap();

// メインウィンドウはGCされないようにグローバル宣言
let mainWindow: BrowserWindow

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Electronの初期化完了後に実行
app.on('ready', () => {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({ width: 1200, height: 800 });
  mainWindow.loadURL('http://localhost:3000/');
  

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', () => {
    mainWindow = null;
  })
})