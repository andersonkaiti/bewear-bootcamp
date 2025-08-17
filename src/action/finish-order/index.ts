'use server'

import { db } from '@db/index'
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable,
} from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function finishOrderAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  })

  if (!cart) {
    throw new Error('Cart not found')
  }

  if (!cart.shippingAddress) {
    throw new Error('Shipping address not found')
  }

  const totalPriceInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  )

  let orderId: string | undefined

  await db.transaction(async (tx) => {
    if (!cart.shippingAddress) {
      throw new Error('Shipping address not found')
    }

    const [order] = await tx
      .insert(orderTable)
      .values({
        number: cart.shippingAddress.number,
        recipientName: cart.shippingAddress.recipientName,
        street: cart.shippingAddress.street,
        state: cart.shippingAddress.state,
        city: cart.shippingAddress.city,
        country: cart.shippingAddress.country,
        cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
        createdAt: new Date(),
        email: cart.shippingAddress.email,
        neighborhood: cart.shippingAddress.neighborhood,
        userId: session.user.id,
        totalPriceInCents,
        zipCode: cart.shippingAddress.zipCode,
        complement: cart.shippingAddress.complement,
        phone: cart.shippingAddress.phone,
        shippingAddressId: cart.shippingAddress.id,
      })
      .returning()

    if (!order) {
      throw new Error('Failed to create order')
    }

    orderId = order.id

    const cartItemPayload: (typeof orderItemTable.$inferInsert)[] =
      cart.items.map((item) => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        quantity: item.quantity,
        priceInCents: item.productVariant.priceInCents,
      }))

    await tx.insert(orderItemTable).values(cartItemPayload)
    await tx.delete(cartTable).where(eq(cartTable.id, cart.id))
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id))
  })

  if (!orderId) {
    throw new Error('Failed to create order')
  }

  return {
    orderId,
  }
}
