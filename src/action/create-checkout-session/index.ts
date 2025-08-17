'use server'

import { env } from '@config/env'
import { db } from '@db/index'
import { cartTable, orderItemTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import {
  type CreateCheckoutSessionSchema,
  createCheckoutSessionSchema,
} from './schema'

export async function createCheckoutSessionAction(
  data: CreateCheckoutSessionSchema
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const { orderId } = createCheckoutSessionSchema.parse(data)

  const order = await db.query.orderTable.findFirst({
    where: eq(cartTable.id, orderId),
  })

  if (!order) {
    throw new Error('Order not found')
  }

  if (order.userId !== session?.user.id) {
    throw new Error('Unauthorized')
  }

  const orderItems = await db.query.orderItemTable.findMany({
    where: eq(orderItemTable.orderId, orderId),
    with: {
      productVariant: {
        with: {
          product: true,
        },
      },
    },
  })

  const stripe = new Stripe(env.STRIPE_SECRET_KEY)

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${env.NEXT_PUBLIC_APP_URL}/checkout/success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL}/checkout/cancel`,
    metadata: {
      orderId,
    },
    line_items: orderItems.map((orderItem) => ({
      price_data: {
        currency: 'brl',
        product_data: {
          name: `${orderItem.productVariant.product.name} - ${orderItem.productVariant.name}`,
          description: orderItem.productVariant.product.description,
          images: [orderItem.productVariant.imageUrl],
        },
        // Em centavos
        unit_amount: orderItem.priceInCents,
      },
      quantity: orderItem.quantity,
    })),
  })

  return checkoutSession.id
}
