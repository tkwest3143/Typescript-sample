import { ipcMain } from 'electron';
import { Setting } from './model/Setting';
import { ConfigService } from './service/config-service';

export function configProcess() {
  const configService = new ConfigService();
  ipcMain.handle('getAllConfig', (_event): Setting[] => {
    return configService.getAllSetting();
  });
  ipcMain.handle('getSettingById', (_event, id: number): Setting => {
    return configService.getSettingById(id);
  });
  ipcMain.handle('registerSetting', (_event, data: Setting): void => {
    configService.registerSetting(
      data.title,
      data.url,
      data.method,
      data.parameters
    );
  });
  ipcMain.handle('updateSetting', (_event, data: Setting): void => {
    configService.updateSetting(data);
  });
}
