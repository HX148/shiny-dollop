/**
 * 新闻爬虫服务
 */
import { News } from "../types";
import NewsStorage from "../data/newsStorage";
import PythonBridge from "../utils/pythonBridge";
import { mockNews } from "../data/seedData";

export class NewsCrawlerService {
  private storage: NewsStorage;
  private isCrawling: boolean = false;

  constructor() {
    this.storage = NewsStorage.getInstance();
  }

  /**
   * 执行完整的新闻抓取
   */
  public async crawlAll(): Promise<{
    success: boolean;
    newsCount: number;
    message: string;
    errors?: string[];
  }> {
    if (this.isCrawling) {
      return {
        success: false,
        newsCount: 0,
        message: "抓取正在进行中，请稍后再试"
      };
    }

    this.isCrawling = true;
    const errors: string[] = [];
    let allNews: News[] = [];

    try {
      console.log("[NewsCrawler] 开始抓取新闻...");

      // 1. 抓取 arXiv 论文
      console.log("[NewsCrawler] 抓取 arXiv 论文...");
      const arxivResult = await PythonBridge.fetchArxivPapers();
      if (arxivResult.success && arxivResult.data?.papers) {
        allNews = allNews.concat(arxivResult.data.papers);
        console.log(`[NewsCrawler] 获取到 ${arxivResult.data.papers.length} 篇 arXiv 论文`);
      } else {
        errors.push("arXiv 抓取失败: " + (arxivResult.error || "未知错误"));
      }

      // 2. 抓取 AI 新闻
      console.log("[NewsCrawler] 抓取 AI 新闻...");
      const newsResult = await PythonBridge.fetchAiNews();
      if (newsResult.success && newsResult.data?.news) {
        allNews = allNews.concat(newsResult.data.news);
        console.log(`[NewsCrawler] 获取到 ${newsResult.data.news.length} 条 AI 新闻`);
      } else {
        errors.push("AI 新闻抓取失败: " + (newsResult.error || "未知错误"));
      }

      // 处理抓取结果
      if (allNews.length > 0) {
        // 合并新闻并去重
        const mergedNews = this.storage.mergeNews(
          this.storage.getNews(),
          allNews
        );
        
        // 更新缓存
        this.storage.updateNews(mergedNews, "crawled");
        
        return {
          success: true,
          newsCount: allNews.length,
          message: `成功抓取 ${allNews.length} 条内容`,
          errors: errors.length > 0 ? errors : undefined
        };
      } else {
        // 全部失败，保留现有数据
        return {
          success: false,
          newsCount: 0,
          message: "所有源抓取失败，使用现有数据",
          errors
        };
      }
    } catch (error) {
      console.error("[NewsCrawler] 抓取过程出错:", error);
      return {
        success: false,
        newsCount: 0,
        message: "抓取过程出错: " + (error instanceof Error ? error.message : String(error)),
        errors: [String(error)]
      };
    } finally {
      this.isCrawling = false;
    }
  }

  /**
   * 获取当前状态
   */
  public getStatus(): {
    isCrawling: boolean;
    cacheInfo: ReturnType<NewsStorage["getCacheInfo"]>;
  } {
    return {
      isCrawling: this.isCrawling,
      cacheInfo: this.storage.getCacheInfo()
    };
  }

  /**
   * 刷新缓存（如果过期）
   */
  public async refreshIfNeeded(): Promise<void> {
    if (this.storage.isCacheExpired() && !this.isCrawling) {
      console.log("[NewsCrawler] 缓存已过期，自动刷新...");
      await this.crawlAll();
    }
  }
}

export default NewsCrawlerService;
