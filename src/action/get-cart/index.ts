'use server'

import { db } from '@db/index'
import { cartTable } from '@db/schema'
import { auth } from '@lib/auth'
import { headers } from 'next/headers'

export async function getCart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const cart = await db.query.cartTable.findFirst({
    where: (table, { eq }) => eq(table.userId, session.user.id),
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

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning()

    return {
      ...newCart,
      items: [],
      totalPriceInCents: 0,
      shippingAddress: null,
    }
  }

  return {
    ...cart,
    totalPriceInCents: cart.items.reduce(
      (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
      0
    ),
  }
}
