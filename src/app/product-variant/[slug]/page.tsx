import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { ProductList } from '@components/common/product/product-list'
import { Button } from '@components/ui/button'
import { db } from '@db/index'
import { productTable, productVariantTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { QuantitySelector } from './_components/quantity-selector'
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

      <div className="flex flex-col space-y-6 pb-4">
        <Image
          alt={productVariant.name}
          className="h-auto w-full"
          height={0}
          sizes="100vw"
          src={productVariant.imageUrl}
          width={0}
        />

        <div className="px-5">
          <VariantSelector
            selectedVariant={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
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

        <div className="px-5">
          <QuantitySelector />
        </div>

        <div className="flex flex-col gap-4 px-4">
          <Button className="rounded-full" variant="outline">
            Adicionar à sacola
          </Button>
          <Button className="rounded-full" size="lg">
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-sm">{productVariant.product.description}</p>
        </div>

        <ProductList products={likelyProducts} title="Talvez você goste" />

        <Footer />
      </div>
    </>
  )
}
