import Application from '../resource/application.json';

export class ApplicationProperty {
  static get applicationName(): string {
    return Application.application_name || 'STRIKE';
  }
  static get serverUrl(): string {
    return Application.server_url || 'http://localhost:8080';
  }
}
