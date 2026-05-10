import { News, NewsListResponse } from '../types';
import { getMockNews, getMockNewsById, searchMockNews } from './mockData';

const API_BASE = '/api';

// 检测是否在本地环境
const isLocalhost = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1';

export async function getNews(page = 1, limit = 10, category?: string): Promise<NewsListResponse> {
  try {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category && category !== '全部') {
      params.append('category', category);
    }
    
    const response = await fetch(`${API_BASE}/news?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  } catch (error) {
    console.log('Falling back to mock data for getNews');
    return getMockNews(page, limit, category);
  }
}

export async function getNewsById(id: string): Promise<News> {
  try {
    const response = await fetch(`${API_BASE}/news/${id}`);
    if (!response.ok) throw new Error('Failed to fetch news');
    return response.json();
  } catch (error) {
    console.log('Falling back to mock data for getNewsById');
    const mockNews = getMockNewsById(id);
    if (!mockNews) throw new Error('News not found');
    return mockNews;
  }
}

export async function searchNews(query: string, page = 1, limit = 10): Promise<NewsListResponse> {
  try {
    const params = new URLSearchParams({ q: query, page: String(page), limit: String(limit) });
    const response = await fetch(`${API_BASE}/search?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to search news');
    return response.json();
  } catch (error) {
    console.log('Falling back to mock data for searchNews');
    return searchMockNews(query, page, limit);
  }
}
