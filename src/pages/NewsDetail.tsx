import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import { getNewsById, getNews } from '../services/api';
import { News } from '../types';
import { Calendar, ExternalLink, ArrowLeft } from 'lucide-react';

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      try {
        setLoading(true);
        const [newsData, allNews] = await Promise.all([
          getNewsById(id),
          getNews(1, 6)
        ]);
        setNews(newsData);
        setRelatedNews(allNews.data.filter(n => n.id !== id).slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
              <img
                src={news.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop'}
                alt={news.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-3">
                  {news.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold mb-3">{news.title}</h1>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(news.publishedAt)}
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
