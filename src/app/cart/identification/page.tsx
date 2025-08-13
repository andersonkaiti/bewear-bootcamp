import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { db } from '@db/index'
import { shippingAddressTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CartSummary } from '../_components/cart-summary'
import { Addresses } from './_components/addresses'

export default async function IdentificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const cart = await db.query.cartTable.findFirst({
    where: (table) => eq(table.userId, session.user.id),
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
      shippingAddress: true,
    },
  })

  if (!cart || cart.items.length === 0) {
    redirect('/')
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  })

  const totalPriceInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  )

  return (
    <div className="space-y-12">
      <Header />

      <div className="space-y-4 px-5">
        <Addresses
          defaultShippingAddressId={cart.shippingAddress?.id || null}
          shippingAddresses={shippingAddresses}
        />

        <CartSummary
          products={cart.items.map((item) => ({
            id: item.productVariant.id,
            name: item.productVariant.name,
            quantity: item.quantity,
            priceInCents: item.productVariant.priceInCents,
            imageUrl: item.productVariant.imageUrl,
            variantName: item.productVariant.name,
          }))}
          subtotalInCents={totalPriceInCents}
          totalInCents={totalPriceInCents}
        />
      </div>

      <Footer />
    </div>
  )
}
