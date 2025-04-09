
import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';
import { useApp } from '../context/AppContext';

const MoodTracker: React.FC = () => {
  const { todaysMood, setTodaysMood } = useApp();
  
  const moods = [
    { type: 'happy', icon: Smile, label: 'Happy', bgColor: 'bg-green-100', textColor: 'text-green-600' },
    { type: 'neutral', icon: Meh, label: 'Neutral', bgColor: 'bg-blue-100', textColor: 'text-blue-600' },
    { type: 'sad', icon: Frown, label: 'Sad', bgColor: 'bg-red-100', textColor: 'text-red-600' },
  ] as const;
  
  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-xl font-medium">How are you feeling today?</h2>
      
      <div className="flex justify-between gap-4">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = todaysMood === mood.type;
          
          return (
            <button
              key={mood.type}
              onClick={() => setTodaysMood(mood.type)}
              className={`
                flex-1 flex flex-col items-center justify-center p-4 rounded-xl 
                transition-all duration-300 ease-out-expo glass-card hover-card
                ${isSelected ? `border-primary/40 shadow-sm ${mood.bgColor} ${mood.textColor}` : 'hover:border-border/80'}
              `}
            >
              <div className={`
                p-3 rounded-full mb-2 transition-all duration-300
                ${isSelected ? 'scale-110' : ''}
              `}>
                <Icon size={32} />
              </div>
              <span className="font-medium text-sm">{mood.label}</span>
            </button>
          );
        })}
      </div>
      
      {todaysMood && (
        <div className="mt-4 animate-slide-in-up">
          <textarea
            placeholder="Add a note about how you're feeling... (optional)"
            className="w-full p-3 rounded-lg border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 resize-none transition-all duration-200"
            rows={3}
            onChange={(e) => setTodaysMood(todaysMood, e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
