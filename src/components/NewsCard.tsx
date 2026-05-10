import { Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { memo, useState } from 'react';
import { News } from '../types';
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

interface NewsCardProps {
  news: News;
}

function NewsCard({ news }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);

  const gradientClass = getCategoryGradient(news.category);
  const categoryIcon = getCategoryIcon(news.category);

  return (
    <Link
      to={`/news/${news.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
    >
      <div className="relative h-48 overflow-hidden">
        {!imageError && news.imageUrl ? (
          <img
            src={news.imageUrl}
            alt={news.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
            <div className="text-6xl">{categoryIcon}</div>
          </div>
        )}
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

export default memo(NewsCard);

