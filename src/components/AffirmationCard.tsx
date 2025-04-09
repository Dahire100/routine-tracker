
import React from 'react';
import { QuoteIcon } from 'lucide-react';

interface AffirmationCardProps {
  affirmation: string;
}

const AffirmationCard: React.FC<AffirmationCardProps> = ({ affirmation }) => {
  return (
    <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-sm">
      <div className="text-primary/80 mb-2">
        <QuoteIcon size={24} />
      </div>
      <p className="text-lg font-medium leading-relaxed text-center">
        {affirmation}
      </p>
    </div>
  );
};

export default AffirmationCard;
