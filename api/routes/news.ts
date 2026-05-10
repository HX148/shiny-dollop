import { Router, Request, Response } from "express";
import NewsStorage from "../data/newsStorage";
import NewsCrawlerService from "../services/newsCrawler";
import { NewsListResponse } from "../types";

const router = Router();
const storage = NewsStorage.getInstance();
const crawler = new NewsCrawlerService();

router.get("/", async (req: Request, res: Response) => {
  try {
    // 自动刷新缓存
    await crawler.refreshIfNeeded();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;

    let filteredNews = storage.getNews();

    if (category && category !== "全部") {
      filteredNews = filteredNews.filter(news => news.category === category);
    }

    filteredNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = filteredNews.slice(startIndex, endIndex);

    const response: NewsListResponse = {
      data: paginatedNews,
      total: filteredNews.length,
      page,
      limit
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = storage.getNewsById(id);

    if (!news) {
      return res.status(404).json({ error: "News not found" });
    }

    res.json(news);
  } catch (error) {
    console.error("Error fetching news detail:", error);
    res.status(500).json({ error: "Failed to fetch news detail" });
  }
});

export default router;
