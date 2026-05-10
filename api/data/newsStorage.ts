/**
 * 新闻数据存储和缓存管理
 */
import { News } from "../types";
import { mockNews } from "./seedData";

interface CachedData {
  news: News[];
  lastUpdated: Date;
  source: "mock" | "crawled";
}

class NewsStorage {
  private static instance: NewsStorage;
  private cachedData: CachedData;
  private readonly CACHE_TTL = 4 * 60 * 60 * 1000; // 4 小时

  private constructor() {
    // 初始使用 mock 数据
    this.cachedData = {
      news: [...mockNews],
      lastUpdated: new Date(),
      source: "mock"
    };
  }

  public static getInstance(): NewsStorage {
    if (!NewsStorage.instance) {
      NewsStorage.instance = new NewsStorage();
    }
    return NewsStorage.instance;
  }

  /**
   * 获取新闻列表
   */
  public getNews(): News[] {
    return [...this.cachedData.news];
  }

  /**
   * 根据 ID 获取新闻
   */
  public getNewsById(id: string): News | undefined {
    return this.cachedData.news.find(n => n.id === id);
  }

  /**
   * 更新新闻缓存
   */
  public updateNews(news: News[], source: "mock" | "crawled" = "crawled"): void {
    this.cachedData = {
      news: [...news],
      lastUpdated: new Date(),
      source
    };
    console.log(`[NewsStorage] 缓存已更新，共 ${news.length} 条新闻，来源: ${source}`);
  }

  /**
   * 检查缓存是否过期
   */
  public isCacheExpired(): boolean {
    return Date.now() - this.cachedData.lastUpdated.getTime() > this.CACHE_TTL;
  }

  /**
   * 获取缓存信息
   */
  public getCacheInfo(): { lastUpdated: Date; count: number; source: string; isExpired: boolean } {
    return {
      lastUpdated: this.cachedData.lastUpdated,
      count: this.cachedData.news.length,
      source: this.cachedData.source,
      isExpired: this.isCacheExpired()
    };
  }

  /**
   * 合并新闻（去重）
   */
  public mergeNews(existingNews: News[], newNews: News[]): News[] {
    const existingIds = new Set(existingNews.map(n => n.id));
    const uniqueNewNews = newNews.filter(n => !existingIds.has(n.id));
    
    // 合并并按时间排序
    const merged = [...existingNews, ...uniqueNewNews];
    merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    // 限制数量
    return merged.slice(0, 100);
  }

  /**
   * 回退到 mock 数据
   */
  public fallbackToMock(): void {
    this.cachedData = {
      news: [...mockNews],
      lastUpdated: new Date(),
      source: "mock"
    };
    console.log("[NewsStorage] 已回退到 mock 数据");
  }
}

export default NewsStorage;
