import { Header } from '@components/common/layout/header'
import { db } from '@db/index'
import { orderTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Orders } from './_components/orders'

export default async function MyOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    return redirect('/login')
  }

  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
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
    },
  })

  return (
    <>
      <Header />

      <div className="px-5">
        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            totalPriceInCents: order.totalPriceInCents || 0,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              productName: item.productVariant.product.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents || 0,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </>
  )
}
