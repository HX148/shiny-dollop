import { Router, Request, Response } from 'express';
import { mockNews } from '../data/seedData';
import { NewsListResponse } from '../types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || '';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    let results = mockNews;

    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim();
      results = mockNews.filter(news => 
        news.title.toLowerCase().includes(searchTerm) ||
        news.summary.toLowerCase().includes(searchTerm) ||
        news.content.toLowerCase().includes(searchTerm)
      );
    }

    results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedNews = results.slice(startIndex, endIndex);

    const response: NewsListResponse = {
      data: paginatedNews,
      total: results.length,
      page,
      limit
    };

    res.json(response);
  } catch (error) {
    console.error('Error searching news:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

export default router;
