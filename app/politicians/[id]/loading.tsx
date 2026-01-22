import { Skeleton } from '@/components/shared/UI/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton variant="text" className="h-32 w-full rounded-none" />
        <div className="px-6 pb-6">
          <div className="flex gap-6 -mt-16">
            <Skeleton variant="text" className="w-32 h-32 rounded-full" />
            <div className="flex-1 mt-16 md:mt-10 space-y-4">
              <Skeleton variant="text" className="h-10 w-64" />
              <Skeleton variant="text" className="h-6 w-96" />
              <Skeleton variant="text" className="h-4 w-full max-w-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Skeleton variant="chart" />
      </div>

      <div className="mt-12">
        <Skeleton variant="text" className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
      </div>
    </div>
  );
}
