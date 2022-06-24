import { Setting } from '../electron/process/model/Setting';

declare global {
  interface Window {
    myAPI: IMyAPI;
  }
}
export interface IMyAPI {
  getAllSetting: () => Setting[];
  getSettingById: (id: number) => Setting;
  registerSetting: (data: Setting) => void;
  updateSetting: (data: Setting) => void;
}
