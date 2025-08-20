import React from 'react';
import { Skeleton } from './skeleton';

interface EnhancedSkeletonProps {
  variant?: 'card' | 'text' | 'circle' | 'button' | 'image';
  lines?: number;
  className?: string;
}

export const EnhancedSkeleton: React.FC<EnhancedSkeletonProps> = ({
  variant = 'text',
  lines = 1,
  className = ''
}) => {
  const baseClasses = "animate-pulse";

  switch (variant) {
    case 'card':
      return (
        <div className={`${baseClasses} ${className}`}>
          <Skeleton className="h-48 w-full rounded-t-xl" />
          <div className="p-4 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      );

    case 'circle':
      return (
        <Skeleton className={`rounded-full ${baseClasses} ${className}`} />
      );

    case 'button':
      return (
        <Skeleton className={`h-10 w-24 rounded-lg ${baseClasses} ${className}`} />
      );

    case 'image':
      return (
        <Skeleton className={`aspect-video w-full rounded-lg ${baseClasses} ${className}`} />
      );

    case 'text':
    default:
      return (
        <div className={`space-y-2 ${baseClasses} ${className}`}>
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'}`}
            />
          ))}
        </div>
      );
  }
};