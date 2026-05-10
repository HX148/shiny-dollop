export interface News {
  id: string;
  title: string;
  summary: string;
  content: string;
  source: string;
  sourceUrl: string;
  category: string;
  publishedAt: string;
  imageUrl?: string;
}

export interface NewsListResponse {
  data: News[];
  total: number;
  page: number;
  limit: number;
}

export const CATEGORIES = [
  'All',
  'LLM',
  'Computer Vision',
  'Robotics',
  'Generative AI',
  'AI Research',
  'Startups'
];
