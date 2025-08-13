import { Header } from '@components/common/layout/header'
import { Skeleton } from '@components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <Header />

      <div className="space-y-6 px-5">
        <Skeleton className="h-7 w-1/2" />

        <div className="grid grid-cols-2 gap-4">
          {[...new Array(4)].map((_, index: number) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple sintax
            <div className="flex flex-col gap-4" key={index}>
              <Skeleton className="aspect-square size-full" />
              <div className="flex flex-col gap-2.5">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
