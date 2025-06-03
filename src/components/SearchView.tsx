
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ArticleCard from './ArticleCard';

interface SearchViewProps {
  onClose: () => void;
  articles: any[];
  categories: any[];
  onBookmark: (articleId: string) => void;
  onShare: (article: any) => void;
  onArticleClick: (article: any) => void;
}

const SearchView = ({ onClose, articles, categories, onBookmark, onShare, onArticleClick }: SearchViewProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredArticles = articles.filter(article => {
    const matchesQuery = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(article.category);
    return matchesQuery && matchesCategory;
  });

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3">
          <Button variant="ghost" size="sm" onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </Button>
          
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="search"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 bg-gray-100 border-0 rounded-full focus:bg-white focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 py-3 border-t border-gray-100 bg-white">
            <p className="text-sm font-medium text-gray-700 mb-2">Categories</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.name) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategories.includes(category.name)
                      ? category.color
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleCategory(category.name)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategories([])}
                className="mt-2 text-blue-600 p-0 h-auto"
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </header>

      {/* Results */}
      <div className="py-4">
        {searchQuery && (
          <div className="px-4 mb-4">
            <p className="text-sm text-gray-600">
              {filteredArticles.length} results for "{searchQuery}"
            </p>
          </div>
        )}
        
        {filteredArticles.length > 0 ? (
          <div className="space-y-0">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onBookmark={onBookmark}
                onShare={onShare}
                onClick={onArticleClick}
              />
            ))}
          </div>
        ) : searchQuery ? (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500">No articles found</p>
          </div>
        ) : (
          <div className="px-4 py-8 text-center">
            <p className="text-gray-500">Start typing to search</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
