"use client";

import { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/store';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader = ({ onComplete }: PreLoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const theme = useGameStore((state) => state.theme);
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // Start fading out after 2.5s

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000); // Complete after 3s total

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const getLoadingMessage = () => {
    switch (theme) {
      case 'persona-4':
        return `Tuning into the Midnight Channel${dots}`;
      case 'persona-3':
        return `Entering the Dark Hour${dots}`;
      case 'persona-5':
      default:
        return `Calling the Phantom Thieves${dots}`;
    }
  };

  return (
    <div className={`pre-loader ${!isVisible ? 'hidden' : ''}`}>
      <div className="pre-loader-content">
        <h1 className="font-display text-4xl" style={{ color: theme === 'persona-5' ? 'var(--primary)' : 'var(--foreground)' }}>
          {getLoadingMessage()}
        </h1>
      </div>
    </div>
  );
};

export default PreLoader;
