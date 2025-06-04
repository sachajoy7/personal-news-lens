
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

interface RelatedArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  category: string;
  categoryColor: string;
  source: string;
  timestamp: string;
  readTime: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
  onArticleClick: (article: any) => void;
}

const RelatedArticles = ({ articles, onArticleClick }: RelatedArticlesProps) => {
  return (
    <div className="py-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 px-4">Related Articles</h3>
      <div className="px-4">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {articles.map((article) => (
              <CarouselItem key={article.id} className="pl-2 md:pl-4 basis-4/5">
                <div 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
                  onClick={() => onArticleClick(article)}
                >
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={`${article.categoryColor} text-white text-xs px-2 py-1`}>
                        {article.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="font-medium">{article.source}</span>
                      <span className="bg-gray-100 px-1 py-0.5 rounded">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </div>
  );
};

export default RelatedArticles;
