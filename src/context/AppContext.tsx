
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

type MoodType = 'happy' | 'neutral' | 'sad' | undefined;

interface Habit {
  id: string;
  name: string;
  icon: string;
  completed: boolean;
  streak: number;
  time?: string;
}

interface MoodEntry {
  date: string;
  mood: MoodType;
  note?: string;
}

interface AppContextType {
  habits: Habit[];
  completedToday: number;
  todaysMood: MoodType;
  moodHistory: MoodEntry[];
  affirmation: string;
  meditationTime: number;
  setMeditationTime: (time: number) => void;
  toggleHabitCompletion: (id: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'completed' | 'streak'>) => void;
  removeHabit: (id: string) => void;
  setTodaysMood: (mood: MoodType, note?: string) => void;
  streakPercentage: number;
}

const defaultHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', icon: 'moon', completed: false, streak: 0, time: '10:00 AM' },
  { id: '2', name: 'Daily Exercise', icon: 'activity', completed: false, streak: 3, time: '7:00 AM' },
  { id: '3', name: 'Gratitude Journal', icon: 'book', completed: false, streak: 5, time: '9:00 PM' },
  { id: '4', name: 'Reading', icon: 'book-open', completed: false, streak: 2, time: '8:00 PM' },
];

const defaultAffirmations = [
  "I am capable of creating positive changes in my life.",
  "Today I choose to be confident and calm.",
  "I trust my intuition and make wise decisions.",
  "I am worthy of love, happiness, and fulfillment.",
  "My potential is limitless, and I can achieve anything I desire.",
  "I embrace challenges as opportunities for growth.",
  "I am grateful for everything I have in my life right now.",
  "My mind is clear, focused, and ready for the day ahead.",
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : defaultHabits;
  });
  
  const [todaysMood, setTodaysMood] = useState<MoodType>(() => {
    const saved = localStorage.getItem('todaysMood');
    // Only parse if saved exists and isn't "undefined"
    if (saved && saved !== "undefined") {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing todaysMood from localStorage:", e);
        return undefined;
      }
    }
    return undefined;
  });
  
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodHistory');
    // Only parse if saved exists
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Error parsing moodHistory from localStorage:", e);
        return [];
      }
    }
    return [];
  });
  
  const [affirmation, setAffirmation] = useState<string>(() => {
    return defaultAffirmations[Math.floor(Math.random() * defaultAffirmations.length)];
  });
  
  const [meditationTime, setMeditationTime] = useState(5);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('todaysMood', JSON.stringify(todaysMood));
  }, [todaysMood]);

  useEffect(() => {
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
  }, [moodHistory]);

  const toggleHabitCompletion = (id: string) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => 
        habit.id === id 
          ? { 
              ...habit, 
              completed: !habit.completed, 
              streak: habit.completed ? habit.streak - 1 : habit.streak + 1 
            } 
          : habit
      )
    );
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'completed' | 'streak'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completed: false,
      streak: 0
    };
    setHabits(prevHabits => [...prevHabits, newHabit]);
  };

  const removeHabit = (id: string) => {
    const habitToRemove = habits.find(h => h.id === id);
    if (habitToRemove) {
      setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
      toast({
        title: "Habit deleted",
        description: `"${habitToRemove.name}" has been removed from your habits.`,
      });
    }
  };

  const updateTodaysMood = (mood: MoodType, note?: string) => {
    setTodaysMood(mood);
    
    const today = new Date().toISOString().split('T')[0];
    
    setMoodHistory(prevHistory => {
      // Check if we already have an entry for today
      const existingEntryIndex = prevHistory.findIndex(entry => entry.date === today);
      
      if (existingEntryIndex >= 0) {
        // Update existing entry
        const updatedHistory = [...prevHistory];
        updatedHistory[existingEntryIndex] = { date: today, mood, note };
        return updatedHistory;
      } else {
        // Add new entry
        return [...prevHistory, { date: today, mood, note }];
      }
    });
  };

  const completedToday = habits.filter(habit => habit.completed).length;
  
  const totalHabits = habits.length;
  const streakPercentage = totalHabits > 0 
    ? Math.round((completedToday / totalHabits) * 100) 
    : 0;

  const value = {
    habits,
    completedToday,
    todaysMood,
    moodHistory,
    affirmation,
    meditationTime,
    setMeditationTime,
    toggleHabitCompletion,
    addHabit,
    removeHabit,
    setTodaysMood: updateTodaysMood,
    streakPercentage
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
