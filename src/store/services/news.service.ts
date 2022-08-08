import {del, get, post, put } from "../../helpers/apiProxy";
import { CreateNewsTyped } from "../types/news.types";

class NewsService {
  public getNews(amount: number, pageNumber: number) {
    return get(`/news/${amount}/${pageNumber}`);
  }

  public getNewsById(id: number) {
    return get(`/news/${id}`);
  }

  public createNews(news: CreateNewsTyped) {
    return post('/news', news);
  }

  public updateNews(id: number, news: CreateNewsTyped) {
    return put(`/news/${id}`, news);
  }

  public deleteNews(id: number) {
    return del(`/news/${id}`);
  }
}

export default NewsService;
