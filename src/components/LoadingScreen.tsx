import React, { useEffect, useState } from 'react';
import { Bird, Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minimumDisplayTime?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  minimumDisplayTime = 2000 
}) => {
  const [stage, setStage] = useState(0);
  const [shouldComplete, setShouldComplete] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 500);
    const timer2 = setTimeout(() => setStage(2), 1000);
    const timer3 = setTimeout(() => setStage(3), 1500);
    
    const minimumTimer = setTimeout(() => {
      setShouldComplete(true);
    }, minimumDisplayTime);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(minimumTimer);
    };
  }, [minimumDisplayTime]);

  useEffect(() => {
    if (shouldComplete && stage >= 3) {
      const exitTimer = setTimeout(() => {
        onLoadingComplete?.();
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [shouldComplete, stage, onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6 animate-fade-in">
        {/* Animated Bird Logo */}
        <div className="relative">
          <div className={`
            transition-all duration-1000 ease-out
            ${stage >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}
          `}>
            <div className="relative">
              <Bird 
                size={80} 
                className="text-primary animate-pulse"
                style={{
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-3 h-3 bg-primary/30 rounded-full animate-ping" />
              <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className={`
          transition-all duration-800 ease-out
          ${stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <h1 className="mobile-heading-xl text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TakooPapook
          </h1>
          <p className="mobile-text-sm text-center mt-2 text-muted-foreground">
            Your Adventure Awaits
          </p>
        </div>

        {/* Loading Progress */}
        <div className={`
          transition-all duration-600 ease-out
          ${stage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <span className="mobile-text-sm text-muted-foreground">
              {shouldComplete ? 'Ready to explore!' : 'Loading...'}
            </span>
          </div>
          
          {/* Progress bar */}
          <div className="w-48 h-1 bg-muted rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-2000 ease-out"
              style={{
                width: `${Math.min((stage + 1) * 25, 100)}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/3 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

// Custom CSS for floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(style);