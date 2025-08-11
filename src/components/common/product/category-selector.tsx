import { Button } from '@components/ui/button'
import type { categoryTable } from '@db/schema'
import Link from 'next/link'

interface ICategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[]
}

export function CategorySelector({ categories }: ICategorySelectorProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            className="rounded-full bg-white font-semibold text-xs"
            key={category.id}
            variant="ghost"
          >
            <Link className="size-full" href={`/category/${category.slug}`}>
              {category.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
