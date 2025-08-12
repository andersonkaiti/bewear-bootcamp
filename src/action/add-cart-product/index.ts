'use server'

import { db } from '@db/index'
import { cartItemTable, cartTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { type AddProductToCartSchema, addProductToCartSchema } from './schema'

export async function addProductToCartAction(data: AddProductToCartSchema) {
  addProductToCartSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const productVariant = await db.query.productVariantTable.findFirst({
    where: (table) => eq(table.id, data.productVariantId),
  })

  if (!productVariant) {
    throw new Error('Product variant not found')
  }

  // Pegar o carrinho
  const cart = await db.query.cartTable.findFirst({
    where: (table) => eq(table.userId, session.user.id),
  })

  let cartId: string

  if (cart) {
    cartId = cart.id
  } else {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning()

    cartId = newCart.id
  }

  // Verificar se a variante já existe no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (table) =>
      eq(table.cartId, cartId) &&
      eq(table?.productVariantId, productVariant.id),
  })

  if (cartItem) {
    await db
      .update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity,
      })
      .where(eq(cartItemTable.id, cartItem.cartId))

    return
  }

  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity,
  })
}
