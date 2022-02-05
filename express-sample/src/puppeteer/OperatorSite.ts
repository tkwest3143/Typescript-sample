import puppeteer, { Browser, Page } from 'puppeteer';
import { SearchResult } from '../types/SearchResult';
import { getCustomRepository, createConnection } from 'typeorm';
import { Site } from '../entity/Site';
export class OperatorSite {
  private site: Site;
  constructor(site: Site) {
    this.site = site;
  }

  async getResult(storeId: string): Promise<SearchResult[] | null> {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      defaultViewport: {
        width: 1280,
        height: 800,
      },
    });
    try {
      const page = await browser.newPage();

      await page.goto(this.site.url);
      console.log('start crawl');
      console.log('item  = ' + this.site.selectorItem);
      console.log('link  = ' + this.site.selectorItemLink);
      console.log('title = ' + this.site.selectorItemPrice);

      //検索結果の取得
      return await page.evaluate(
        (
          selector_item,
          selector_link,
          selector_title,
          selector_price,
          selector_status
        ) => {
          const list = Array.from(document.querySelectorAll(selector_item));
          console.log('list-data:' + list.length);
          return list.map((data) => {
            console.log('item-data:' + data);
            const title = data.querySelector(selector_title).textContent;
            const link = data.querySelector(selector_link).href;
            const price = data.querySelector(selector_price).textContent;
            const status = data.querySelector(selector_status).textContent;
            return { title, link, price, status } as SearchResult;
          });
        },
        this.site.selectorItem,
        this.site.selectorItemLink,
        this.site.selectorItemTitle,
        this.site.selectorItemPrice,
        this.site.selectorItemStatus
      );
    } catch (e) {
      console.log(e);
      return null;
    } finally {
      await browser.close();
    }
  }
}
