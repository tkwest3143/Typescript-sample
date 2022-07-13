export interface NewsResponse {
  news_list: {
    title: string;
    link: string;
    pubDate: string;
    image: string;
    description: string;
  }[];
}
