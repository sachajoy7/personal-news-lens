
import React from 'react';
import { BookmarkIcon, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  categoryColor: string;
  image: string;
  source: string;
  timestamp: string;
  readTime: string;
  isBookmarked: boolean;
  personalizedInsight?: string;
}

interface ArticleCardProps {
  article: Article;
  onBookmark: (articleId: string) => void;
  onShare: (article: Article) => void;
  onClick: (article: Article) => void;
}

const ArticleCard = ({ article, onBookmark, onShare, onClick }: ArticleCardProps) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4 mx-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-102 active:scale-98"
      onClick={() => onClick(article)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge 
            className={`${article.categoryColor} text-white font-medium px-3 py-1`}
          >
            {article.category}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 w-8 h-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(article.id);
            }}
          >
            <BookmarkIcon 
              className={`w-4 h-4 ${article.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} 
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/90 hover:bg-white text-gray-700 w-8 h-8 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onShare(article);
            }}
          >
            <Share className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
          {article.title}
        </h2>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">
          {article.summary}
        </p>

        {article.personalizedInsight && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
            <p className="text-xs font-semibold text-blue-800 mb-1">📍 Personal Impact</p>
            <p className="text-sm text-blue-700">{article.personalizedInsight}</p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <span>{article.timestamp}</span>
          </div>
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {article.readTime} read
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
