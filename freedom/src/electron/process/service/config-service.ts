import Store from 'electron-store';
import { ApiTestSetting } from '../model/api-test-setting';
import { Setting } from '../model/Setting';
export class ConfigService {
  private store = new Store<ApiTestSetting>({
    name: 'api-setting', // 設定ファイル名を指定　※省略可。拡張子は.jsonになる
  });
  registerSetting(
    title: string,
    url: string,
    method: string,
    parameters: { key: string; value: string }[]
  ): Setting {
    console.log(this.store.path);
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
    console.log('save start');
    this.store.set('settings', settings);
    this.store.set('max_id', id);
    console.log('save complete');
    return setting;
  }
  updateSetting(setting: Setting): void {
    const settings: Setting[] = this.getAllSetting();
    if (!setting.id) {
      throw new Error(`not found setting.id [data=${setting}]`);
    }

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
