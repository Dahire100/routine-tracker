
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import AnimatedTransition from './AnimatedTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 pb-20 pt-4">
        <AnimatedTransition key={location.pathname}>
          {children}
        </AnimatedTransition>
      </main>
      <Navbar />
    </div>
  );
};

export default Layout;
