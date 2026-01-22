import { cn } from '@/lib/utils';

type SkeletonVariant = 'card' | 'list' | 'chart' | 'text';

interface SkeletonProps {
  variant?: SkeletonVariant;
  className?: string;
}

export function Skeleton({ variant = 'card', className }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={cn('bg-white rounded-lg overflow-hidden shadow-md', className)}>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-48 w-full" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className={cn('bg-white rounded-lg p-4 shadow-md', className)}>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'chart') {
    return (
      <div className={cn('bg-white rounded-lg p-6 shadow-md', className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
          <div className="h-64 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn('animate-pulse', className)}>
      <div className="h-4 bg-gray-200 rounded" />
    </div>
  );
}
