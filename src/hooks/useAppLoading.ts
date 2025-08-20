import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseAppLoadingOptions {
  minimumLoadingTime?: number;
  additionalChecks?: (() => boolean)[];
}

export const useAppLoading = (options: UseAppLoadingOptions = {}) => {
  const { minimumLoadingTime = 2000, additionalChecks = [] } = options;
  const { loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let minimumTimeReached = false;

    // Start progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 90) return prev + Math.random() * 15;
        return prev;
      });
    }, 100);

    // Minimum loading time
    const minimumTimer = setTimeout(() => {
      minimumTimeReached = true;
      checkIfReady();
    }, minimumLoadingTime);

    const checkIfReady = () => {
      const authReady = !authLoading;
      const additionalReady = additionalChecks.every(check => check());
      
      if (minimumTimeReached && authReady && additionalReady) {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    // Check readiness when auth state changes
    if (!authLoading) {
      checkIfReady();
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(minimumTimer);
    };
  }, [authLoading, minimumLoadingTime, additionalChecks]);

  return { isLoading, progress };
};