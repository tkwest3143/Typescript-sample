import ServerAccessr from '../../server/request/request';

export class UploadService {
  private accesser = new ServerAccessr();
  async fileUpload(files: File[]): Promise<void> {
    await this.accesser.upload(files);
  }
}
