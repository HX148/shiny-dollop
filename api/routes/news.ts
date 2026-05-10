import { Router, Request, Response } from 'express';
import { mockNews } from '../data/seedData';
import { NewsListResponse } from '../types';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;

    let filteredNews = [...mockNews];

    if (category && category !== 'All') {
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
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const news = mockNews.find(n => n.id === id);

    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json(news);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    res.status(500).json({ error: 'Failed to fetch news detail' });
  }
});

export default router;
