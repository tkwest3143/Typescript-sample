import { Injectable, ConsoleLogger } from '@nestjs/common';
import { Setting } from 'src/config/Setting';
import Store from 'electron-store';
import { ApiTestSetting } from 'src/config/api-test-setting';
@Injectable()
export class ApiTestService {
  private readonly logger = new ConsoleLogger(ApiTestService.name);
  private store = new Store<ApiTestSetting>({
    cwd: 'config', // 保存ディレクトリを指定　※省略可。推奨されていない
    name: 'api-setting', // 設定ファイル名を指定　※省略可。拡張子は.jsonになる
  });
  registerSetting(
    title: string,
    url: string,
    method: string,
    parameters: { key: string; value: string }[],
  ): Setting {
    let id = 1;
    if (this.store.has('max_id')) {
      id = Number(this.store.get('max_id')) + 1;
    }
    const settings = this.getAllSetting();
    const setting: Setting = {
      id,
      title,
      url,
      method,
      parameters,
    };
    settings.push(setting);
    this.store.set('settings', settings);
    this.store.set('max_id', id);
    return setting;
  }
  updateSetting(setting: Setting): void {
    this.logger.log('updateSetting');
    const settings: Setting[] = this.getAllSetting();
    settings[setting.id] = setting;
    this.store.set('settings', settings);
  }
  getSettingById(id: number): Setting {
    const settings: Setting[] = this.getAllSetting();
    const value = settings[id];
    return value;
  }
  getAllSetting(): Setting[] {
    if (!this.store.has('settings')) {
      return [];
    }
    const value: Setting[] = this.store.get('settings');
    return value;
  }
}
