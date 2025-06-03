
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Phone, MapPin } from 'lucide-react';

interface PersonalizedSummaryProps {
  article: {
    title: string;
    personalizedForYou: string;
    positiveBenefits: string[];
    actionItems: Array<{
      type: 'article' | 'contact' | 'resource';
      title: string;
      description: string;
      link: string;
    }>;
  };
}

const PersonalizedSummary = ({ article }: PersonalizedSummaryProps) => {
  const getActionIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return <Phone className="w-4 h-4" />;
      case 'resource':
        return <MapPin className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'contact':
        return 'bg-green-500 hover:bg-green-600';
      case 'resource':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Personalized For You */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Badge className="bg-blue-500 text-white">
            👤 Personalized for You
          </Badge>
        </div>
        <p className="text-gray-700 leading-relaxed">{article.personalizedForYou}</p>
      </div>

      {/* Positive Benefits */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Badge className="bg-green-500 text-white">
            ✨ Positive Benefits for You
          </Badge>
        </div>
        <ul className="space-y-2">
          {article.positiveBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-green-500 font-bold mt-1">+</span>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What You Can Do */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Badge className="bg-orange-500 text-white">
            🎯 What You Can Do
          </Badge>
        </div>
        <div className="space-y-3">
          {article.actionItems.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full ${getActionColor(action.type)} text-white hover:text-white justify-start h-auto p-4 rounded-lg`}
              onClick={() => window.open(action.link, '_blank')}
            >
              <div className="flex items-start space-x-3 w-full">
                {getActionIcon(action.type)}
                <div className="text-left flex-1">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-sm opacity-90 mt-1">{action.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalizedSummary;
