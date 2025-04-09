
import React, { useRef, useEffect } from 'react';

interface AnimatedTransitionProps {
  children: React.ReactNode;
}

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({ children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Add initial classes for entrance animation
    node.classList.add('opacity-0', 'translate-y-4');
    
    // Trigger animation after a tiny delay to ensure DOM is ready
    const timer = setTimeout(() => {
      node.classList.remove('opacity-0', 'translate-y-4');
      node.classList.add('opacity-100', 'translate-y-0');
    }, 10);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={nodeRef} 
      className="w-full transition-all duration-500 ease-out-expo"
    >
      {children}
    </div>
  );
};

export default AnimatedTransition;
