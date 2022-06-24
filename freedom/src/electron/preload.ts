import { contextBridge, ipcRenderer } from 'electron';
import { Setting } from './process/model/Setting';

contextBridge.exposeInMainWorld('myAPI', {
  counter: (count: number) => {
    return count + 1;
  },
  getAllSetting: () =>
    ipcRenderer
      .invoke('getAllConfig')
      .then((result) => result)
      .catch((err) => console.log(err)),
  getSettingById: (id: number) =>
    ipcRenderer
      .invoke('getSettingById', id)
      .then((result) => result)
      .catch((err) => console.log(err)),
  registerSetting: (data: Setting) =>
    ipcRenderer
      .invoke('registerSetting', data)
      .then((result) => result)
      .catch((err) => console.log(err)),
  updateSetting: (data: Setting) =>
    ipcRenderer
      .invoke('updateSetting', data)
      .then((result) => result)
      .catch((err) => console.log(err)),
});
