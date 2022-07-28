import ServerAccessr from '../../../server/request/request';

export class NewsService {
  private accesser = new ServerAccessr();
  async getNewsData(userId: string) {
    return this.accesser.getNewsData(userId);
  }
  async getNewsByCategory(categoryId: string) {
    return this.accesser.getNewsByCaegory(categoryId);
  }
  async getNewsCategory() {
    return this.accesser.getNewsCategory();
  }
}
