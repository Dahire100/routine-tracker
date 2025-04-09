
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from '@/hooks/use-toast';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const MeditationTimer: React.FC = () => {
  const { meditationTime, setMeditationTime } = useApp();
  const [timeLeft, setTimeLeft] = useState(meditationTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const alarmSound = useRef<HTMLAudioElement | null>(null);

  const timeOptions = [1, 3, 5, 10, 15, 20];

  useEffect(() => {
    // Create audio element for alarm
    alarmSound.current = new Audio('/meditation-bell.mp3');
    alarmSound.current.preload = 'auto';
    
    return () => {
      if (alarmSound.current) {
        alarmSound.current.pause();
        alarmSound.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setTimeLeft(meditationTime * 60);
    setIsActive(false);
    setIsCompleted(false);
  }, [meditationTime]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      
      // Play alarm sound when time is up
      if (alarmSound.current) {
        alarmSound.current.play().catch(e => console.error("Could not play alarm sound:", e));
      }
      
      // Show notification
      toast({
        title: "Meditation Complete",
        description: `You've completed your ${meditationTime} minute meditation session.`,
      });
      
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, meditationTime]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(meditationTime * 60);
    setIsCompleted(false);
  };

  const selectTime = (minutes: number) => {
    if (!isActive) {
      setMeditationTime(minutes);
      setIsCompleted(false);
    }
  };

  const progressPercentage = (1 - timeLeft / (meditationTime * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-md">
        <div className="flex justify-between mb-6">
          {timeOptions.map((time) => (
            <button
              key={time}
              onClick={() => selectTime(time)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-all duration-300
                ${time === meditationTime
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'}
              `}
            >
              {time} min
            </button>
          ))}
        </div>

        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute -inset-5">
            <div
              className="w-full h-full rounded-full animate-pulse-slow opacity-30 blur-xl"
              style={{
                background: isActive
                  ? 'radial-gradient(circle, rgba(var(--primary), 0.2) 0%, rgba(var(--background), 0) 70%)'
                  : 'none',
              }}
            />
          </div>
          
          <div 
            className={`
              relative w-64 h-64 rounded-full flex items-center justify-center
              ${isCompleted ? 'bg-primary/10' : 'glass-card'}
              ${isActive ? 'animate-pulse-slow' : ''}
            `}
          >
            <div className="text-5xl font-light">{formatTime(timeLeft)}</div>
            
            {/* Progress circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                ref={circleRef}
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="754"
                strokeDashoffset={754 - (754 * progressPercentage) / 100}
                className={`
                  transition-all duration-1000 ease-out-expo
                  ${isCompleted ? 'text-primary' : 'text-primary/20'}
                `}
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={resetTimer}
            className="p-3 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-all duration-200"
            aria-label="Reset Timer"
          >
            <RotateCcw size={24} />
          </button>
          
          <button
            onClick={toggleTimer}
            className={`
              p-5 rounded-full transition-all duration-300 btn-pulse
              ${isActive
                ? 'bg-primary/90 text-primary-foreground hover:bg-primary/80'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'}
            `}
            aria-label={isActive ? 'Pause' : 'Start'}
          >
            {isActive ? <Pause size={30} /> : <Play size={30} className="ml-1" />}
          </button>
        </div>
      </div>
      
      {isCompleted && (
        <div className="mt-8 text-center animate-scale-in">
          <h3 className="text-xl font-medium mb-2">Well done!</h3>
          <p className="text-muted-foreground">
            You've completed your {meditationTime} minute meditation session.
          </p>
        </div>
      )}
    </div>
  );
};

export default MeditationTimer;
