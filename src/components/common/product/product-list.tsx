'use client'

import type { productTable, productVariantTable } from '@db/schema'
import { ProductItem } from './product-item'

interface IProductListProps {
  title: string
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[]
  })[]
}

export function ProductList({ title, products }: IProductListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-bold text-sm lg:px-10">{title}</h3>

      <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden lg:gap-6 lg:px-10">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
