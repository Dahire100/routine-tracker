
import React from 'react';
import { CircleUser, TrendingUp, Calendar, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HabitCard from '../components/HabitCard';
import AffirmationCard from '../components/AffirmationCard';

const Index: React.FC = () => {
  const { habits, completedToday, affirmation, streakPercentage } = useApp();
  
  // Get current date
  const currentDate = new Date();
  const dateString = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-medium">Hello, there</h1>
          <p className="text-muted-foreground">{dateString}</p>
        </div>
        <button className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-all">
          <CircleUser size={24} />
        </button>
      </header>
      
      <AffirmationCard affirmation={affirmation} />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4 border border-border/50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <TrendingUp size={20} />
          </div>
          <p className="text-muted-foreground text-sm">Today's Progress</p>
          <p className="text-2xl font-medium mt-1">{streakPercentage}%</p>
        </div>
        
        <div className="glass-card rounded-xl p-4 border border-border/50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
            <Award size={20} />
          </div>
          <p className="text-muted-foreground text-sm">Completed</p>
          <p className="text-2xl font-medium mt-1">{completedToday}/{habits.length}</p>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">Today's Habits</h2>
          <span className="text-sm text-muted-foreground">
            {completedToday} of {habits.length} completed
          </span>
        </div>
        
        <div className="space-y-3">
          {habits.map(habit => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
