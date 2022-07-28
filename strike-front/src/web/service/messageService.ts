import { message_en } from '../../constant/message/message.en';
import { message_ja } from '../../constant/message/message.ja';

export default class MessageService {
  static get Messages() {
    const lang = window.navigator.language;
    if (lang === 'ja') {
      return message_ja;
    } else {
      return message_en;
    }
  }

  static NewsCategory(category: string) {
    const lang = window.navigator.language;
    if (lang === 'ja') {
      return message_ja.news_category[
        category as keyof typeof message_ja.news_category
      ];
    } else {
      return message_en.news_category[
        category as keyof typeof message_ja.news_category
      ];
    }
  }
}
