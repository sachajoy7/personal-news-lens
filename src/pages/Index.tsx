
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import ArticleCard from '@/components/ArticleCard';
import ArticleView from '@/components/ArticleView';
import SearchView from '@/components/SearchView';
import BottomNavigation from '@/components/BottomNavigation';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'search'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All', color: 'bg-gray-600', bgColor: 'bg-gray-100', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop' },
    { id: 'politics', name: 'Politics', color: 'bg-red-600', bgColor: 'bg-red-100', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop' },
    { id: 'economy', name: 'Economy', color: 'bg-green-600', bgColor: 'bg-green-100', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop' },
    { id: 'health', name: 'Health', color: 'bg-blue-600', bgColor: 'bg-blue-100', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop' },
    { id: 'environment', name: 'Environment', color: 'bg-emerald-600', bgColor: 'bg-emerald-100', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop' },
    { id: 'technology', name: 'Technology', color: 'bg-purple-600', bgColor: 'bg-purple-100', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop' },
  ];

  const mockArticles = [
    {
      id: '1',
      title: 'New Zealand Housing Crisis: Government Announces $2.8B Investment Package',
      summary: 'The coalition government unveils a comprehensive housing package aimed at addressing affordability challenges across major cities.',
      content: 'The New Zealand government has announced a significant $2.8 billion investment package to tackle the ongoing housing crisis that has affected thousands of families across the country.\n\nThe package includes measures to fast-track housing development, provide first-home buyer grants, and increase social housing stock by 15,000 units over the next three years.\n\nHousing Minister Chris Bishop outlined the key components of the package, emphasizing the government\'s commitment to making homeownership more accessible for working families.\n\nThe initiative comes as house prices in Auckland and Wellington remain among the highest in the world relative to income, with many young New Zealanders struggling to enter the property market.',
      category: 'Politics',
      categoryColor: 'bg-red-600',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&h=400&fit=crop',
      source: 'NZ Herald',
      author: 'Sarah Mitchell',
      timestamp: '2 hours ago',
      readTime: '3 min',
      isBookmarked: false,
      personalizedInsight: 'As a young professional in Auckland, this could help you access first-home buyer grants of up to $10,000.',
      personalizedForYou: 'Based on your profile as a 28-year-old professional earning $75,000 in Auckland, this housing package could significantly impact your ability to purchase your first home. The new first-home buyer grants could provide you with up to $10,000 in assistance, while the fast-tracked development could help stabilize prices in your preferred areas.',
      positiveBenefits: [
        'Eligible for up to $10,000 first-home buyer grant',
        'Increased housing supply in Auckland may stabilize prices',
        'New shared ownership schemes could reduce deposit requirements',
        'Priority access to affordable housing developments'
      ],
      actionItems: [
        {
          type: 'resource',
          title: 'Check Grant Eligibility',
          description: 'Use the official calculator to see your grant amount',
          link: 'https://kaingaora.govt.nz/first-home-grant'
        },
        {
          type: 'contact',
          title: 'Contact Local MP',
          description: 'Share your housing story with Chloe Swarbrick',
          link: 'mailto:chloe.swarbrick@parliament.govt.nz'
        },
        {
          type: 'article',
          title: 'Home Buying Guide 2024',
          description: 'Complete guide for first-time buyers in NZ',
          link: '#'
        }
      ]
    },
    {
      id: '2',
      title: 'Cost of Living Relief: Fuel Tax Cut Extended Through Winter',
      summary: 'The government extends the 25-cent fuel excise duty reduction for another six months as families face ongoing financial pressure.',
      content: 'The New Zealand government has confirmed the extension of the 25-cent per litre fuel excise duty reduction through the winter months, providing continued relief to households struggling with cost of living pressures.\n\nFinance Minister Nicola Willis announced that the measure, originally set to expire at the end of March, will now continue until September 2024.\n\nThe decision comes as petrol prices have remained elevated despite global oil price fluctuations, with the average price at the pump still above $2.50 per litre in most regions.\n\nTransport groups have welcomed the extension, noting that fuel costs represent a significant portion of household budgets, particularly for families in rural areas who rely heavily on vehicles for daily transportation.',
      category: 'Economy',
      categoryColor: 'bg-green-600',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      source: 'Stuff',
      author: 'Michael Chen',
      timestamp: '4 hours ago',
      readTime: '2 min',
      isBookmarked: true,
      personalizedInsight: 'This saves you approximately $8 per week based on your commuting distance.',
      personalizedForYou: 'Given your daily 45km round-trip commute from Hamilton to Auckland and your Toyota Corolla\'s fuel efficiency, this fuel tax extension will save you approximately $32 per month. Over the six-month extension period, you could save around $192 in fuel costs.',
      positiveBenefits: [
        'Save approximately $8 per week on fuel costs',
        'Total potential savings of $192 over six months',
        'Reduced pressure on your weekly budget',
        'More money available for other essential expenses'
      ],
      actionItems: [
        {
          type: 'resource',
          title: 'Find Cheapest Fuel',
          description: 'Use Gaspy app to find lowest prices near you',
          link: 'https://gaspy.nz'
        },
        {
          type: 'article',
          title: 'Fuel-Efficient Driving Tips',
          description: 'Learn to reduce your fuel consumption',
          link: '#'
        }
      ]
    },
    {
      id: '3',
      title: 'Mental Health Breakthrough: Free Counselling Sessions Expanded',
      summary: 'The health ministry announces doubling of free mental health sessions from 8 to 16 per year for all New Zealanders.',
      content: 'New Zealand\'s mental health support system received a major boost today as Health Minister Dr. Shane Reti announced the expansion of free counselling sessions from 8 to 16 per year for all residents.\n\nThe $180 million initiative aims to address the growing mental health crisis, particularly among young adults and those affected by recent extreme weather events.\n\nThe expanded service will be available through existing community mental health providers and includes online counselling options for rural communities with limited access to in-person services.\n\nMental Health Foundation CEO Shaun Robinson praised the announcement, calling it "a crucial step toward making mental health support truly accessible for all New Zealanders."\n\nThe changes will take effect from July 1, 2024, with providers already working to increase capacity to meet expected demand.',
      category: 'Health',
      categoryColor: 'bg-blue-600',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      source: 'RNZ',
      author: 'Dr. Emma Thompson',
      timestamp: '6 hours ago',
      readTime: '4 min',
      isBookmarked: false,
      personalizedInsight: 'You can now access 16 free sessions annually, potentially saving you $1,600 in counselling costs.',
      personalizedForYou: 'As someone who has previously accessed mental health services and expressed interest in regular counselling support, this expansion means you can now access double the number of free sessions. This could save you up to $1,600 annually if you were to use all 16 sessions at private rates.',
      positiveBenefits: [
        'Access to 16 free counselling sessions per year',
        'Potential savings of up to $1,600 annually',
        'Online options available for convenience',
        'No referral needed from GP for basic services'
      ],
      actionItems: [
        {
          type: 'resource',
          title: 'Book Free Session',
          description: 'Find mental health providers in your area',
          link: 'https://www.healthpoint.co.nz'
        },
        {
          type: 'contact',
          title: 'Mental Health Helpline',
          description: 'Need immediate support? Call 1737',
          link: 'tel:1737'
        },
        {
          type: 'article',
          title: 'Mental Health Self-Care Guide',
          description: 'Tips for maintaining good mental health',
          link: '#'
        }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArticles(mockArticles);
      setLoading(false);
    }, 1500);
  }, []);

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category.toLowerCase() === activeCategory);

  const handleBookmark = (articleId: string) => {
    setArticles(prev => prev.map(article => 
      article.id === articleId 
        ? { ...article, isBookmarked: !article.isBookmarked }
        : article
    ));
    
    const article = articles.find(a => a.id === articleId);
    if (article) {
      toast({
        title: article.isBookmarked ? "Bookmark removed" : "Article saved",
        description: article.isBookmarked ? "Removed from your saved articles" : "Added to your saved articles",
      });
    }
  };

  const handleShare = (article: any) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard",
      });
    }
  };

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setCurrentView('article');
  };

  if (currentView === 'search') {
    return (
      <SearchView
        onClose={() => setCurrentView('home')}
        articles={articles}
        categories={categories}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onArticleClick={handleArticleClick}
      />
    );
  }

  if (currentView === 'article' && selectedArticle) {
    return (
      <ArticleView
        article={selectedArticle}
        onBack={() => setCurrentView('home')}
        onBookmark={handleBookmark}
        onShare={handleShare}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header onSearchClick={() => setCurrentView('search')} />
      
      {activeTab === 'home' && (
        <>
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="py-4">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-0">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onBookmark={handleBookmark}
                    onShare={handleShare}
                    onClick={handleArticleClick}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'bookmarks' && (
        <div className="py-4">
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold text-gray-900">Saved Articles</h2>
          </div>
          {articles.filter(article => article.isBookmarked).length > 0 ? (
            <div className="space-y-0">
              {articles.filter(article => article.isBookmarked).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  onClick={handleArticleClick}
                />
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500">No saved articles yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="p-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-900">Auckland, New Zealand</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Age</label>
                <p className="text-gray-900">28 years old</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Occupation</label>
                <p className="text-gray-900">Software Developer</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Income</label>
                <p className="text-gray-900">$75,000 NZD</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Interests</label>
                <p className="text-gray-900">Housing, Technology, Environment</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
