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
  '全部',
  '大语言模型',
  '计算机视觉',
  '机器人',
  '生成式 AI',
  'AI 研究',
  '初创企业',
  'AI 医疗',
  'AI 金融',
  'AI 教育',
  'AI 自动驾驶'
];
