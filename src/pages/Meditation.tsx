
import React from 'react';
import MeditationTimer from '../components/MeditationTimer';

const Meditation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] pt-8">
      <header className="text-center mb-8">
        <h1 className="text-2xl font-medium mb-2">Meditation</h1>
        <p className="text-muted-foreground max-w-md">
          Take a few minutes to breathe and center yourself.
        </p>
      </header>
      
      <MeditationTimer />
      
      <div className="mt-12 text-center max-w-md text-muted-foreground text-sm">
        <p>
          Find a comfortable position, close your eyes, and focus on your breath.
          Let thoughts come and go without judgment.
        </p>
      </div>
    </div>
  );
};

export default Meditation;
