import { CategorySelector } from '@components/common/category-selector'
import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { ProductList } from '@components/common/product/product-list'
import { db } from '@db/index'
import { productTable } from '@db/schema'
import { desc } from 'drizzle-orm'
import Image from 'next/image'

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  })

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    limit: 4,
    with: {
      variants: true,
    },
  })

  const categories = await db.query.categoryTable.findMany({})

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            alt="Leve uma vida com estilo"
            className="h-auto w-full"
            height={0}
            sizes="100vw"
            src="/banner-01.png"
            width={0}
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            alt="Leve uma vida com estilo"
            className="h-auto w-full"
            height={0}
            sizes="100vw"
            src="/banner-02.png"
            width={0}
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />

        <Footer />
      </div>
    </>
  )
}
