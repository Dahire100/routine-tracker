
import React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Define the Habit type to match what's in AppContext
interface Habit {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  time?: string;
}

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabitCompletion } = useApp();

  const handleToggleHabit = () => {
    toggleHabitCompletion(habit.id);
  };

  // Calculate streak color based on streak count
  const getStreakColor = () => {
    if (habit.streak >= 10) return '#10b981'; // green for big streaks
    if (habit.streak >= 5) return '#f59e0b'; // yellow for medium streaks
    return '#6b7280'; // gray for low streaks
  };

  return (
    <div 
      className={`rounded-xl p-4 border mb-3 overflow-hidden cursor-pointer 
        ${habit.completed ? 'bg-secondary border-border' : 'bg-card border-border/50'}`}
      onClick={handleToggleHabit}
    >
      <div className="flex items-center">
        <div className="mr-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
            ${habit.completed 
              ? 'bg-primary border-primary' 
              : 'border-muted-foreground/30'}`}
          >
            {habit.completed && <Check size={14} className="text-primary-foreground" />}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="mb-1">
            <p className="font-medium text-foreground">{habit.name}</p>
            {habit.time && (
              <p className="text-xs text-muted-foreground">{habit.time}</p>
            )}
          </div>
          
          <div>
            <span style={{ color: getStreakColor() }} className="text-xs font-medium">
              {habit.streak} day streak
            </span>
          </div>
        </div>
        
        <div>
          <ChevronRight size={16} className="text-muted-foreground" />
        </div>
      </div>
      
      <div className="h-[3px] bg-muted mt-3 rounded-sm overflow-hidden">
        <div 
          className="h-full bg-primary"
          style={{ width: habit.completed ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
};

export default HabitCard;
