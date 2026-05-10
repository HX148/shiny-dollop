import { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import { getNews } from '../services/api';
import { News, CATEGORIES } from '../types';
import { Sparkles, AlertCircle } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNews(1, 12, selectedCategory);
      setNews(response.data);
    } catch (err) {
      console.error('Failed to fetch news:', err);
      setError('加载新闻失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              每日 AI 新闻
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
              领先一步，掌握
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}AI 革命
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              您值得信赖的人工智能领域最新突破、研究和创新新闻来源。
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-800 mb-2">出错了</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <button 
                onClick={fetchNews}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
              >
                重试
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <div className="h-48 bg-slate-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-slate-200 rounded w-1/3 animate-pulse" />
                    <div className="h-6 bg-slate-200 rounded w-full animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}

          {!loading && news.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-500 text-lg">该分类暂无新闻。</p>
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
