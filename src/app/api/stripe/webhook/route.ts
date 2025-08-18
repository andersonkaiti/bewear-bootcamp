'use server'

import { env } from '@config/env'
import { db } from '@db/index'
import { orderTable } from '@db/schema'
import { eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.error()
  }

  const text = await request.text()

  const stripe = new Stripe(env.STRIPE_SECRET_KEY)

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  )

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const orderId = session.metadata?.orderId

    if (!orderId) {
      return NextResponse.error()
    }

    await db
      .update(orderTable)
      .set({
        status: 'paid',
      })
      .where(eq(orderTable.id, orderId))
  }

  return NextResponse.json({
    received: true,
  })
}
