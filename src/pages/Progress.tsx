
import React from 'react';
import { Award, Calendar, TrendingUp, Star } from 'lucide-react';
import ProgressChart from '../components/ProgressChart';
import { useApp } from '../context/AppContext';

const Progress: React.FC = () => {
  const { habits, streakPercentage } = useApp();
  
  // Calculate total streaks
  const totalStreaks = habits.reduce((total, habit) => total + habit.streak, 0);
  
  // Get the habit with the longest streak
  const longestStreakHabit = habits.reduce(
    (longest, habit) => habit.streak > longest.streak ? habit : longest, 
    { name: 'None', streak: 0 }
  );
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-medium">Your Progress</h1>
        <p className="text-muted-foreground">Track your journey</p>
      </header>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-4 border border-border/50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            <Award size={20} />
          </div>
          <p className="text-muted-foreground text-sm">Total Streaks</p>
          <p className="text-2xl font-medium mt-1">{totalStreaks} days</p>
        </div>
        
        <div className="glass-card rounded-xl p-4 border border-border/50 flex flex-col items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
            <Star size={20} />
          </div>
          <p className="text-muted-foreground text-sm">Habit Completion</p>
          <p className="text-2xl font-medium mt-1">{streakPercentage}%</p>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 border border-border/60">
        <div className="flex items-center mb-2">
          <TrendingUp className="mr-2 text-primary" size={18} />
          <h2 className="text-lg font-medium">Longest Streak</h2>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              {longestStreakHabit.name}
            </p>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {longestStreakHabit.streak} days
          </div>
        </div>
      </div>
      
      <ProgressChart />
      
      <div className="glass-card rounded-xl p-4 border border-border/60">
        <div className="flex items-center mb-4">
          <Calendar className="mr-2 text-primary" size={18} />
          <h2 className="text-lg font-medium">Upcoming Milestones</h2>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">7-Day Streak</p>
              <p className="text-sm text-muted-foreground">Morning Meditation</p>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              5 days left
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">30-Day Challenge</p>
              <p className="text-sm text-muted-foreground">Complete all habits</p>
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              24 days left
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
