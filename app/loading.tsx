import { Skeleton } from '@/components/shared/UI/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Skeleton variant="text" className="h-10 w-64 mb-2" />
        <Skeleton variant="text" className="h-6 w-96" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 hidden lg:block">
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant="card" className="h-48" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
