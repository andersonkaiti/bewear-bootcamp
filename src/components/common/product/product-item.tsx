import type { productTable, productVariantTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import Image from 'next/image'
import Link from 'next/link'

interface IProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  }
}

export function ProductItem({ product }: IProductItemProps) {
  const firstVariant = product.variants[0]

  return (
    <Link className="flex flex-col gap-4" href="/">
      <Image
        alt={firstVariant.name}
        className="rounded-[1.5rem]"
        height={200}
        src={firstVariant.imageUrl}
        width={200}
      />

      <div className="flex max-w-50 flex-col gap-1">
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
