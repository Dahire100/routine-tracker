
import React, { useState } from 'react';
import { PlusCircle, Activity, BookOpen, Moon, Heart, Pencil, MessageSquare, BarChart3, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import HabitCard from '../components/HabitCard';
import { toast } from "@/components/ui/use-toast";

const HabitTracker: React.FC = () => {
  const { habits, addHabit } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('activity');
  const [newHabitTime, setNewHabitTime] = useState('');
  
  const iconOptions = [
    { name: 'activity', icon: Activity },
    { name: 'book-open', icon: BookOpen },
    { name: 'moon', icon: Moon },
    { name: 'heart', icon: Heart },
    { name: 'pencil', icon: Pencil },
    { name: 'message-square', icon: MessageSquare },
    { name: 'bar-chart', icon: BarChart3 },
  ];
  
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newHabitName.trim()) {
      addHabit({
        name: newHabitName,
        icon: newHabitIcon,
        time: newHabitTime || undefined,
      });
      
      toast({
        title: "Habit created",
        description: `${newHabitName} has been added to your habits.`,
      });
      
      // Reset form
      setNewHabitName('');
      setNewHabitIcon('activity');
      setNewHabitTime('');
      setShowAddForm(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-medium">Habit Tracker</h1>
        <p className="text-muted-foreground">Manage your daily habits</p>
      </header>
      
      <button
        onClick={() => setShowAddForm(prev => !prev)}
        className="w-full py-3 px-4 border border-dashed border-border rounded-xl flex items-center justify-center space-x-2 hover:bg-secondary/50 transition-colors"
      >
        <PlusCircle size={18} />
        <span>{showAddForm ? 'Cancel' : 'Add New Habit'}</span>
      </button>
      
      {showAddForm && (
        <div className="glass-card rounded-xl p-4 border border-border/80 animate-scale-in">
          <form onSubmit={handleAddHabit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">
                Habit Name
              </label>
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
                placeholder="e.g., Morning Meditation"
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">
                Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.name}
                      type="button"
                      onClick={() => setNewHabitIcon(option.name)}
                      className={`
                        p-3 rounded-lg transition-all
                        ${newHabitIcon === option.name
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-foreground hover:bg-secondary/80'}
                      `}
                    >
                      <Icon size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">
                Reminder Time (Optional)
              </label>
              <input
                type="time"
                value={newHabitTime}
                onChange={(e) => setNewHabitTime(e.target.value)}
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 transition-all"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add Habit
            </button>
          </form>
        </div>
      )}
      
      <div className="space-y-3">
        {habits.length > 0 ? (
          habits.map(habit => (
            <HabitCard key={habit.id} habit={habit} />
          ))
        ) : (
          <p className="text-center py-8 text-muted-foreground">
            No habits added yet. Add your first habit!
          </p>
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
