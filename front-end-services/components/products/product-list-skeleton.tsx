import { Skeleton } from "@/components/ui/skeleton"

export default function ProductListSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar Skeleton */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="space-y-6">
          <Skeleton className="h-10 w-full" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>

          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="flex-1">
        <div className="hidden lg:flex justify-end mb-6">
          <Skeleton className="h-10 w-48" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-square w-full rounded-md" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-1/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
