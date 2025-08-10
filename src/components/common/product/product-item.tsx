import type { productTable, productVariantTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import { cn } from '@lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface IProductItemProps extends Partial<Pick<HTMLDivElement, 'className'>> {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  }
}

export function ProductItem({ product, className }: IProductItemProps) {
  const firstVariant = product.variants[0]

  return (
    <Link className="flex flex-col gap-4" href="/">
      <Image
        alt={firstVariant.name}
        className="h-auto w-full rounded-3xl"
        height={0}
        sizes="100vw"
        src={firstVariant.imageUrl}
        width={0}
      />

      <div className={cn('flex max-w-50 flex-col gap-1', className)}>
        <p className="truncate font-medium text-sm">{product.name}</p>
        <p className="truncate font-medium text-muted-foreground text-sm">
          {product.description}
        </p>
        <p className="truncate font-semibold text-sm">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  )
}
