import { Footer } from '@components/common/layout/footer'
import { Header } from '@components/common/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { db } from '@db/index'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { CartSummary } from '../_components/cart-summary'
import { formatAddress } from '../_helpers/address'
import { FinishOrderButton } from './_components/finish-order-button'

export default async function ConfirmationPage() {
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

  const totalPriceInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  )

  if (!cart.shippingAddress) {
    redirect('/cart/identification')
  }

  return (
    <div className="space-y-4">
      <Header />

      <div className="space-y-4 px-5">
        <Card>
          <CardHeader>
            <CardTitle>Identificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card>
              <CardContent>
                <p className="text-sm">{formatAddress(cart.shippingAddress)}</p>
              </CardContent>
            </Card>

            <FinishOrderButton />
          </CardContent>
        </Card>

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

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  )
}
