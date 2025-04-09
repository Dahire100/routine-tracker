
import React from 'react';
import MoodTracker from '../components/MoodTracker';
import { BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Mood: React.FC = () => {
  const { todaysMood } = useApp();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-medium">Mood Tracker</h1>
        <p className="text-muted-foreground">Track how you feel today</p>
      </header>
      
      <MoodTracker />
      
      {todaysMood && (
        <div className="mt-8 animate-fade-in">
          <div className="flex items-center mb-4">
            <BookOpen className="mr-2" size={20} />
            <h2 className="text-xl font-medium">Gratitude Journal</h2>
          </div>
          
          <div className="glass-card rounded-xl p-4 border border-border/60">
            <p className="text-sm text-muted-foreground mb-3">
              Write down three things you're grateful for today:
            </p>
            
            {[1, 2, 3].map((num) => (
              <div key={num} className="mb-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center mr-2 text-sm">
                    {num}
                  </div>
                  <input
                    type="text"
                    placeholder={`I'm grateful for...`}
                    className="w-full p-2 border-b border-border bg-transparent focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
            ))}
            
            <button className="mt-4 w-full py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors">
              Save Journal Entry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mood;
