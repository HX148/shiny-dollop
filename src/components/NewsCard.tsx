import { Calendar, ExternalLink, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { News } from '../types';

interface NewsCardProps {
  news: News;
}

export default function NewsCard({ news }: NewsCardProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/news/${news.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={news.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {news.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(news.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <ExternalLink className="h-3 w-3" />
            {news.source}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {news.title}
        </h3>

        <p className="text-slate-600 text-sm line-clamp-3">
          {news.summary}
        </p>

        <div className="mt-4 flex items-center text-blue-600 text-sm font-medium gap-1">
          阅读更多
          <ExternalLink className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
