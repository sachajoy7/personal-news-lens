
import React from 'react';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ onSearchClick }: { onSearchClick: () => void }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Kōrero</h1>
          <p className="text-xs text-gray-500">New Zealand News</p>
        </div>
        
        <Button variant="ghost" size="sm" className="p-2" onClick={onSearchClick}>
          <Search className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
