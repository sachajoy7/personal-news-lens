
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Category {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  image: string;
}

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs = ({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <ScrollArea className="w-full">
        <div className="flex space-x-3 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 relative overflow-hidden rounded-xl transition-all duration-300 ${
                activeCategory === category.id
                  ? 'ring-2 ring-blue-500 ring-offset-2 scale-105'
                  : 'hover:scale-102'
              }`}
            >
              <div 
                className={`w-20 h-20 ${category.bgColor} relative overflow-hidden`}
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-xs font-semibold text-white leading-tight">
                    {category.name}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default CategoryTabs;
