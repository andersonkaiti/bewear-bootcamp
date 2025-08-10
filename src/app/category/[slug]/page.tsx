import { Header } from '@components/common/layout/header'
import { ProductItem } from '@components/common/product/product-item'
import { db } from '@db/index'
import { categoryTable, productTable } from '@db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

interface ICategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: ICategoryPageProps) {
  const { slug } = await params

  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  })

  if (!category) {
    return notFound()
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  })

  return (
    <>
      <Header />

      <div className="space-y-6 px-5">
        <h2 className="font-semibold text-xl">{category.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <ProductItem
              className="max-w-full"
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </>
  )
}
