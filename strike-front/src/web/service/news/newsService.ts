import ServerAccessr from '../../../server/request/request';

export class NewsService {
  private accesser = new ServerAccessr();
  async getNewsData(userId: string) {
    return this.accesser.getNewsData(userId);
  }
}
