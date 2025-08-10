import type { productVariantTable } from '@db/schema'
import Image from 'next/image'
import Link from 'next/link'

interface IVariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[]
  selectedVariant: string
}

export function VariantSelector({
  variants,
  selectedVariant,
}: IVariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          className={
            variant.slug === selectedVariant
              ? 'rounded-xl border-2 border-primary'
              : ''
          }
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
        >
          <Image
            alt={variant.name}
            className="rounded-xl"
            height={68}
            src={variant.imageUrl}
            width={68}
          />
        </Link>
      ))}
    </div>
  )
}
