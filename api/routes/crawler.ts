/**
 * 爬虫管理 API 路由
 */
import { Router, Request, Response } from "express";
import NewsCrawlerService from "../services/newsCrawler";

const router = Router();
const crawler = new NewsCrawlerService();

/**
 * 获取爬虫状态
 */
router.get("/status", (req: Request, res: Response) => {
  try {
    const status = crawler.getStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error("Error getting crawler status:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get crawler status"
    });
  }
});

/**
 * 手动触发爬虫
 */
router.post("/trigger", async (req: Request, res: Response) => {
  try {
    const result = await crawler.crawlAll();
    res.json({
      success: result.success,
      message: result.message,
      newsCount: result.newsCount,
      errors: result.errors
    });
  } catch (error) {
    console.error("Error triggering crawler:", error);
    res.status(500).json({
      success: false,
      error: "Failed to trigger crawler"
    });
  }
});

export default router;
