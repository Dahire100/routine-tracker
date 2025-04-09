import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useApp } from '../context/AppContext';

const ProgressChart: React.FC = () => {
  const { habits, moodHistory } = useApp();
  
  // Create data for the last 7 days with actual recorded habit completion data
  const getLast7Days = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
      const dateStr = date.toISOString().split('T')[0];
      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
      
      // Find mood for this day
      const moodEntry = moodHistory.find(entry => entry.date === dateStr);
      
      let moodValue = 0;
      if (moodEntry) {
        if (moodEntry.mood === 'happy') moodValue = 3;
        else if (moodEntry.mood === 'neutral') moodValue = 2;
        else if (moodEntry.mood === 'sad') moodValue = 1;
      }
      
      // Calculate the actual completion percentage for this day
      // In a real app, we would have historical data stored
      // Here we're using the current completion status if it's today,
      // otherwise a fixed value of 0 as we don't have historical data
      let completionPercentage = 0;
      
      if (i === 0 && habits.length > 0) {
        // Today's data - use actual completion percentage
        const completedCount = habits.filter(h => h.completed).length;
        completionPercentage = Math.round((completedCount / habits.length) * 100);
      }
      
      data.push({
        day: dayName,
        date: dateStr,
        completed: completionPercentage,
        mood: moodValue
      });
    }
    
    return data;
  };
  
  const chartData = getLast7Days();
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const moodValue = payload[1]?.value || 0;
      let moodText = 'No data';
      
      if (moodValue === 3) moodText = 'Happy';
      else if (moodValue === 2) moodText = 'Neutral';
      else if (moodValue === 1) moodText = 'Sad';
      
      return (
        <div className="p-3 bg-background border border-border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">Completed: </span>
            {`${payload[0]?.value || 0}%`}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="text-primary">Mood: </span>
            {moodText}
          </p>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="bg-card rounded-xl shadow-sm p-4 border border-border">
      <h3 className="text-lg font-medium mb-4">Weekly Progress</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completed" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              className="opacity-80"
            />
            <Bar 
              dataKey="mood" 
              fill="hsl(var(--accent))"
              radius={[4, 4, 0, 0]} 
              className="opacity-80"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
