import { News, NewsListResponse } from '../types';

const API_BASE = '/api';

export async function getNews(page = 1, limit = 10, category?: string): Promise<NewsListResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category && category !== 'All') {
    params.append('category', category);
  }
  
  const response = await fetch(`${API_BASE}/news?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

export async function getNewsById(id: string): Promise<News> {
  const response = await fetch(`${API_BASE}/news/${id}`);
  if (!response.ok) throw new Error('Failed to fetch news');
  return response.json();
}

export async function searchNews(query: string, page = 1, limit = 10): Promise<NewsListResponse> {
  const params = new URLSearchParams({ q: query, page: String(page), limit: String(limit) });
  const response = await fetch(`${API_BASE}/search?${params.toString()}`);
  if (!response.ok) throw new Error('Failed to search news');
  return response.json();
}
