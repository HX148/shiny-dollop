import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard';
import { getNews } from '../services/api';
import { News, CATEGORIES } from '../types';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    async function fetchNews() {
      try {
        setLoading(true);
        const response = await getNews(1, 12, selectedCategory);
        setNews(response.data);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Daily AI News
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
              Stay Ahead of the
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {' '}AI Revolution
              </span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Your trusted source for the latest breakthroughs, research, and innovations in artificial intelligence.
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
              <p className="text-slate-500 text-lg">No news found for this category.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">
            © 2024 Daily AI News. Stay informed, stay ahead.
          </p>
        </div>
      </footer>
    </div>
  );
}
