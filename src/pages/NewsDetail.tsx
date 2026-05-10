import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import { getNewsById, getNews } from '../services/api';
import { News } from '../types';
import { Calendar, ExternalLink, ArrowLeft, AlertCircle } from 'lucide-react';
import { formatDate } from '../lib/utils';

// 生成 SVG 占位符的函数
const getCategoryGradient = (category: string) => {
  const gradients: Record<string, string> = {
    '大语言模型': 'from-blue-500 to-indigo-600',
    '计算机视觉': 'from-green-500 to-teal-600',
    '机器人': 'from-orange-500 to-red-600',
    '生成式 AI': 'from-purple-500 to-pink-600',
    'AI 研究': 'from-cyan-500 to-blue-600',
    '初创企业': 'from-yellow-500 to-orange-600',
    'AI 医疗': 'from-emerald-500 to-green-600',
    'AI 金融': 'from-amber-500 to-yellow-600',
    'AI 教育': 'from-violet-500 to-purple-600',
    'AI 自动驾驶': 'from-rose-500 to-red-600',
  };
  return gradients[category] || 'from-slate-500 to-gray-600';
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    '大语言模型': '💬',
    '计算机视觉': '👁️',
    '机器人': '🤖',
    '生成式 AI': '🎨',
    'AI 研究': '🔬',
    '初创企业': '🚀',
    'AI 医疗': '🏥',
    'AI 金融': '💰',
    'AI 教育': '📚',
    'AI 自动驾驶': '🚗',
  };
  return icons[category] || '📰';
};

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        setImageError(false);
        const [newsData, allNews] = await Promise.all([
          getNewsById(id),
          getNews(1, 6)
        ]);
        setNews(newsData);
        setRelatedNews(allNews.data.filter(n => n.id !== id).slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch news:', err);
        setError('加载新闻失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
              <div className="h-96 bg-slate-200" />
              <div className="p-8 space-y-4">
                <div className="h-8 bg-slate-200 rounded w-1/4" />
                <div className="h-10 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-800 mb-2">出错了</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-24 pb-16 text-center">
          <p className="text-slate-500 text-lg">新闻未找到。</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const gradientClass = getCategoryGradient(news.category);
  const categoryIcon = getCategoryIcon(news.category);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回新闻列表
          </Link>

          <article className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="relative h-96">
              {!imageError && news.imageUrl ? (
                <img
                  src={news.imageUrl}
                  alt={news.title}
                  loading="lazy"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
                  <div className="text-9xl">{categoryIcon}</div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-3">
                  {news.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{news.title}</h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(news.publishedAt, { month: 'long' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <ExternalLink className="h-4 w-4" />
                    {news.source}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                {news.summary}
              </p>

              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {news.content}
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <a
                  href={news.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
                >
                  阅读原文
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </article>

          {relatedNews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">相关新闻</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 每日 AI 新闻。保持关注，保持领先。
          </p>
        </div>
      </footer>
    </div>
  );
}
