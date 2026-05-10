import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import { searchNews } from '../services/api';
import { News } from '../types';
import { Search as SearchIcon, ArrowLeft, AlertCircle } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(async () => {
    if (!query) {
      setLoading(false);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await searchNews(query);
      setNews(response.data);
    } catch (err) {
      console.error('Failed to search news:', err);
      setError('搜索失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <SearchIcon className="h-6 w-6 text-slate-400" />
              <h1 className="text-3xl font-bold text-slate-900">
                搜索结果
              </h1>
            </div>
            {query && (
              <p className="text-lg text-slate-600">
                显示结果：<span className="font-semibold text-slate-900">"{query}"</span>
              </p>
            )}
          </div>

          {error && (
            <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-800 mb-2">出错了</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <button 
                onClick={fetchResults}
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
          ) : news.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <SearchIcon className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-700 mb-2">未找到结果</h2>
              <p className="text-slate-500">
                {query ? '尝试不同的搜索词' : '输入搜索词来查找新闻'}
              </p>
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
