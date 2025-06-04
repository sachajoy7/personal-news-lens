
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [personalizedOpen, setPersonalizedOpen] = React.useState(true);
  const [benefitsOpen, setBenefitsOpen] = React.useState(true);
  const [actionsOpen, setActionsOpen] = React.useState(true);

  const getActionIcon = (type: string) => {
    return <ExternalLink className="w-4 h-4" />;
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
    <div className="space-y-4">
      {/* Personalized For You */}
      <Collapsible open={personalizedOpen} onOpenChange={setPersonalizedOpen}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl overflow-hidden">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-blue-100/50 transition-colors">
            <Badge className="bg-blue-500 text-white">
              👤 Personalized for You
            </Badge>
            {personalizedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <p className="text-gray-700 leading-relaxed">{article.personalizedForYou}</p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Positive Benefits */}
      <Collapsible open={benefitsOpen} onOpenChange={setBenefitsOpen}>
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl overflow-hidden">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-green-100/50 transition-colors">
            <Badge className="bg-green-500 text-white">
              ✨ Positive Benefits for You
            </Badge>
            {benefitsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4">
              <ul className="space-y-2">
                {article.positiveBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-green-500 font-bold mt-1">+</span>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* What You Can Do */}
      <Collapsible open={actionsOpen} onOpenChange={setActionsOpen}>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl overflow-hidden">
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-orange-100/50 transition-colors">
            <Badge className="bg-orange-500 text-white">
              🎯 What You Can Do
            </Badge>
            {actionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-4 pb-4 space-y-3">
              {article.actionItems.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full ${getActionColor(action.type)} text-white hover:text-white justify-start h-auto p-4 rounded-lg`}
                  onClick={() => {
                    if (action.type === 'article') {
                      // Handle internal navigation
                      console.log('Navigate to:', action.link);
                    } else {
                      window.open(action.link, '_blank');
                    }
                  }}
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
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
};

export default PersonalizedSummary;
