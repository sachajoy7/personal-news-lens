
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryTabs from '@/components/CategoryTabs';
import ArticleCard from '@/components/ArticleCard';
import ArticleView from '@/components/ArticleView';
import SearchView from '@/components/SearchView';
import BottomNavigation from '@/components/BottomNavigation';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import EditableProfile from '@/components/EditableProfile';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentView, setCurrentView] = useState<'home' | 'article' | 'search'>('home');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Morgan',
    location: 'Auckland, New Zealand',
    age: '28 years old',
    occupation: 'Software Developer',
    income: 'Medium Income (40k - 100k)',
    interests: ['Housing', 'Technology', 'Environment']
  });

  const categories = [
    { id: 'all', name: 'All', color: 'bg-gray-600', bgColor: 'bg-gray-100', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=200&fit=crop' },
    { id: 'politics', name: 'Politics', color: 'bg-red-600', bgColor: 'bg-red-100', image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=200&fit=crop' },
    { id: 'economy', name: 'Economy', color: 'bg-green-600', bgColor: 'bg-green-100', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=200&h=200&fit=crop' },
    { id: 'health', name: 'Health', color: 'bg-blue-600', bgColor: 'bg-blue-100', image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=200&fit=crop' },
    { id: 'environment', name: 'Environment', color: 'bg-emerald-600', bgColor: 'bg-emerald-100', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=200&h=200&fit=crop' },
    { id: 'technology', name: 'Technology', color: 'bg-purple-600', bgColor: 'bg-purple-100', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=200&h=200&fit=crop' },
  ];

  const mockArticles = [
    {
      id: '1',
      title: 'New Zealand Housing Crisis: Government Announces $2.8B Investment Package',
      summary: 'The coalition government unveils a comprehensive housing package aimed at addressing affordability challenges across major cities.',
      content: 'The New Zealand government has announced a significant $2.8 billion investment package to tackle the ongoing housing crisis that has affected thousands of families across the country.\n\nThe package includes measures to fast-track housing development, provide first-home buyer grants, and increase social housing stock by 15,000 units over the next three years.\n\nHousing Minister Chris Bishop outlined the key components of the package, emphasizing the government\'s commitment to making homeownership more accessible for working families.\n\nThe initiative comes as house prices in Auckland and Wellington remain among the highest in the world relative to income, with many young New Zealanders struggling to enter the property market.\n\nThe fast-track consenting process is expected to reduce development timeframes by up to 12 months, while new partnerships with private developers will help deliver affordable housing faster.\n\nCritics argue that the package doesn\'t address underlying supply constraints, but supporters believe it represents a significant step toward housing affordability.',
      category: 'Politics',
      categoryColor: 'bg-red-600',
      image: 'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&h=400&fit=crop',
      source: 'Stuff.co.nz',
      author: 'Sarah Mitchell',
      timestamp: '2 hours ago',
      readTime: '3 min',
      isBookmarked: false,
      hasAudio: true,
      hasVideo: false,
      pullQuote: 'This represents the largest housing investment in New Zealand\'s recent history, targeting the core issues that have made homeownership a distant dream for many Kiwis.',
      contentImages: ['https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=600&h=400&fit=crop'],
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
          type: 'article',
          title: 'Find Your Dream Property',
          description: 'Browse available properties in Auckland within your budget',
          link: '/property-search'
        },
        {
          type: 'article',
          title: 'Home Buying Guide 2024',
          description: 'Complete step-by-step guide for first-time buyers',
          link: '/guides/home-buying'
        },
        {
          type: 'article',
          title: 'Mortgage Calculator',
          description: 'Calculate your borrowing capacity and repayments',
          link: '/tools/mortgage-calculator'
        },
        {
          type: 'article',
          title: 'First Home Grant Eligibility',
          description: 'Check if you qualify for government assistance',
          link: '/grants/first-home'
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
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
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
          type: 'article',
          title: 'Budget Planning Tools',
          description: 'Manage your finances with our budgeting calculator',
          link: '/tools/budget-planner'
        },
        {
          type: 'article',
          title: 'Find Cheapest Fuel Stations',
          description: 'Locate the lowest fuel prices in your area',
          link: '/fuel-prices'
        },
        {
          type: 'article',
          title: 'Car-Free Transport Options',
          description: 'Explore public transport and cycling routes',
          link: '/transport/alternatives'
        },
        {
          type: 'article',
          title: 'Energy Saving Tips',
          description: 'Reduce your household energy costs',
          link: '/guides/energy-saving'
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
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
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
          type: 'article',
          title: 'Find Mental Health Services',
          description: 'Locate counsellors and therapists in Auckland',
          link: '/health/mental-health-providers'
        },
        {
          type: 'article',
          title: 'Book Free Counselling Session',
          description: 'Schedule your first appointment online',
          link: '/health/book-counselling'
        },
        {
          type: 'article',
          title: 'Mental Health Self-Assessment',
          description: 'Take a quick wellness check and get resources',
          link: '/health/self-assessment'
        },
        {
          type: 'article',
          title: 'Workplace Mental Health Support',
          description: 'Access employee assistance programs',
          link: '/workplace/mental-health'
        }
      ]
    }
  ];

  const generateMoreArticles = () => {
    const sources = ['Stuff.co.nz', 'The Press', 'The Post', 'Waikato Times'];
    const categories = ['Politics', 'Economy', 'Health', 'Environment', 'Technology'];
    const authors = ['Sarah Mitchell', 'Mike Chen', 'Emma Thompson', 'David Wilson', 'Lisa Park', 'Tom Brown'];
    
    // Use reliable Unsplash images for generated articles
    const reliableImages = [
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1527576539890-dfa815648363?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&h=400&fit=crop'
    ];
    
    const additionalArticles = [];
    for (let i = 5; i <= 22; i++) {
      additionalArticles.push({
        id: i.toString(),
        title: `Breaking: Major Development in ${categories[i % categories.length]} Sector Affects Thousands`,
        summary: `Latest updates on significant ${categories[i % categories.length].toLowerCase()} developments across New Zealand with local impact analysis.`,
        content: `This is a developing story about ${categories[i % categories.length].toLowerCase()} issues affecting New Zealand communities.\n\nLocal authorities have confirmed significant changes that will impact residents across multiple regions.\n\nExperts suggest this development will have lasting effects on the community and economy.\n\nWe will continue to monitor this story and provide updates as more information becomes available.`,
        category: categories[i % categories.length],
        categoryColor: i % 2 === 0 ? 'bg-blue-600' : 'bg-green-600',
        image: reliableImages[i % reliableImages.length],
        source: sources[i % sources.length],
        author: authors[i % authors.length],
        timestamp: `${i} hours ago`,
        readTime: `${2 + (i % 4)} min`,
        isBookmarked: false,
        hasAudio: i % 3 === 0,
        hasVideo: i % 4 === 0,
        pullQuote: `This represents a significant shift in New Zealand's ${categories[i % categories.length].toLowerCase()} landscape.`,
        personalizedInsight: `This development could directly impact your ${userProfile.interests[0].toLowerCase()} interests.`,
        personalizedForYou: `Based on your profile and interests, this ${categories[i % categories.length].toLowerCase()} development could have implications for your daily life and future planning.`,
        positiveBenefits: [
          'Potential positive impact on your sector',
          'New opportunities may arise',
          'Improved local services expected'
        ],
        actionItems: [
          {
            type: 'article',
            title: `Related ${categories[i % categories.length]} News`,
            description: `More stories about ${categories[i % categories.length].toLowerCase()} developments`,
            link: `/category/${categories[i % categories.length].toLowerCase()}`
          }
        ]
      });
    }
    return additionalArticles;
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setArticles([...mockArticles, ...generateMoreArticles()]);
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

  const getRelatedArticles = (currentArticle: any) => {
    return articles
      .filter(article => 
        article.id !== currentArticle.id && 
        (article.category === currentArticle.category || 
         article.source === currentArticle.source)
      )
      .slice(0, 5);
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
        relatedArticles={getRelatedArticles(selectedArticle)}
        onBack={() => setCurrentView('home')}
        onBookmark={handleBookmark}
        onShare={handleShare}
        onArticleClick={handleArticleClick}
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
          <EditableProfile 
            profile={userProfile}
            onProfileUpdate={setUserProfile}
          />
        </div>
      )}

      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
