import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { ProductList } from '@components/common/product/product-list'
import { db } from '@db/index'
import { productTable, productVariantTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ProductActions } from './_components/product-actions'
import { VariantSelector } from './_components/variants-selector'

interface IProductVariantPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductVariantPage({
  params,
}: IProductVariantPageProps) {
  const { slug } = await params

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  })

  if (!productVariant) {
    notFound()
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  })

  return (
    <>
      <Header />

      <div className="flex flex-col pb-4 lg:mx-auto lg:max-w-7xl">
        <div className="flex flex-col space-y-6 lg:flex-row lg:items-start lg:gap-10 lg:px-10 lg:py-10 lg:space-y-0">
          <div className="lg:w-1/2">
            <Image
              alt={productVariant.name}
              className="h-auto w-full lg:rounded-3xl"
              height={0}
              sizes="100vw"
              src={productVariant.imageUrl}
              width={0}
            />
          </div>

          <div className="flex flex-col space-y-6 lg:w-1/2">
            <div className="px-5 lg:px-0">
              <VariantSelector
                selectedVariant={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="px-5 lg:px-0">
              <h2 className="font-semibold text-lg">
                {productVariant.product.name}
              </h2>

              <h3 className="text-muted-foreground text-sm">
                {productVariant.name}
              </h3>

              <h3 className="font-semibold text-lg">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="px-5 lg:px-0">
              <p className="text-sm">{productVariant.product.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          <ProductList products={likelyProducts} title="Talvez você goste" />
          <Footer />
        </div>
      </div>
    </>
  )
}
