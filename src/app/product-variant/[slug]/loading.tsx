import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { Skeleton } from '@components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <Header />

      <div className="flex flex-col space-y-7.5 pb-4">
        <Skeleton className="aspect-square min-h-94 w-full" />

        <div className="flex items-center gap-4 px-5">
          <Skeleton className="size-17 rounded-xl" />
          <Skeleton className="size-17 rounded-xl" />
        </div>

        <div className="space-y-2 px-5">
          <Skeleton className="h-4 w-20" />

          <Skeleton className="h-3 w-10" />

          <Skeleton className="h-6 w-22" />
        </div>

        <div className="space-y-4 px-5">
          <Skeleton className="h-4 w-30" />

          <Skeleton className="h-9 w-30" />
        </div>

        <div className="flex flex-col gap-4 px-5">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>

        <div className="space-y-2 px-5">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>

        <div className="space-y-6">
          <Skeleton className="mx-5 h-4 w-1/2" />

          <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
            <div className="flex flex-col gap-4">
              <Skeleton className="size-50" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="size-50" />
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
