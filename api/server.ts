/**
 * local server entry file, for local development
 */
import app from './app.js';
import cron from 'node-cron';
import NewsCrawlerService from './services/newsCrawler.js';

/**
 * start server with port
 */
const PORT = process.env.PORT || 3001;
const crawler = new NewsCrawlerService();

const server = app.listen(PORT, () => {
  console.log(`Server ready on port ${PORT}`);
  
  // 设置定时任务：每 6 小时执行一次新闻抓取
  cron.schedule('0 */6 * * *', async () => {
    console.log('[Cron] 定时新闻抓取任务启动...');
    try {
      const result = await crawler.crawlAll();
      console.log(`[Cron] 定时抓取完成: ${result.message}`);
    } catch (error) {
      console.error('[Cron] 定时抓取失败:', error);
    }
  });
  
  console.log('[Cron] 定时任务已设置，每 6 小时自动抓取新闻');
});

/**
 * close server
 */
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;