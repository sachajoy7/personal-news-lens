import React from 'react';
import { ArrowLeft, BookmarkIcon, Share, Headphones, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import PersonalizedSummary from './PersonalizedSummary';
import RelatedArticles from './RelatedArticles';

interface ArticleViewProps {
  article: {
    id: string;
    title: string;
    content: string;
    category: string;
    categoryColor: string;
    image: string;
    source: string;
    timestamp: string;
    author: string;
    isBookmarked: boolean;
    personalizedForYou: string;
    positiveBenefits: string[];
    actionItems: Array<{
      type: 'article' | 'contact' | 'resource';
      title: string;
      description: string;
      link: string;
    }>;
    hasAudio?: boolean;
    hasVideo?: boolean;
    pullQuote?: string;
    contentImages?: string[];
  };
  relatedArticles: any[];
  onBack: () => void;
  onBookmark: (articleId: string) => void;
  onShare: (article: any) => void;
  onArticleClick: (article: any) => void;
}

const ArticleView = ({ article, relatedArticles, onBack, onBookmark, onShare, onArticleClick }: ArticleViewProps) => {
  const handlePlayAudio = () => {
    // TODO: Implement text-to-speech functionality
    console.log('Playing article audio...');
  };

  const handlePlayVideo = () => {
    // TODO: Implement video playback
    console.log('Playing article video...');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex space-x-2">
            {article.hasAudio && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={handlePlayAudio}
              >
                <Headphones className="w-5 h-5" />
              </Button>
            )}
            {article.hasVideo && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={handlePlayVideo}
              >
                <Video className="w-5 h-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => onBookmark(article.id)}
            >
              <BookmarkIcon 
                className={`w-5 h-5 ${article.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} 
              />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={() => onShare(article)}
            >
              <Share className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <Badge className={`${article.categoryColor} text-white mb-2`}>
            {article.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title and Meta */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 space-x-2">
            <span className="font-medium">{article.source}</span>
            <span>•</span>
            <span>{article.author}</span>
            <span>•</span>
            <span>{article.timestamp}</span>
          </div>
        </div>

        {/* Personalized Summary */}
        <PersonalizedSummary article={article} />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Full Article</h3>
            <div className="text-gray-700 leading-relaxed space-y-4">
              {article.content.split('\n\n').map((paragraph, index) => {
                // Add pull quote after first paragraph
                if (index === 0 && article.pullQuote) {
                  return (
                    <React.Fragment key={index}>
                      <p>{paragraph}</p>
                      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 italic text-lg font-medium text-gray-800">
                        "{article.pullQuote}"
                      </blockquote>
                    </React.Fragment>
                  );
                }
                
                // Add images throughout the article
                if (index === 2 && article.contentImages && article.contentImages[0]) {
                  return (
                    <React.Fragment key={index}>
                      <p>{paragraph}</p>
                      <div className="my-6">
                        <img 
                          src={article.contentImages[0]} 
                          alt="Article content" 
                          className="w-full rounded-lg"
                        />
                      </div>
                    </React.Fragment>
                  );
                }
                
                return <p key={index}>{paragraph}</p>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      <div className="border-t border-gray-200">
        <RelatedArticles 
          articles={relatedArticles} 
          onArticleClick={onArticleClick}
        />
      </div>

      {/* Bottom padding for safe area */}
      <div className="h-20" />
    </div>
  );
};

export default ArticleView;
