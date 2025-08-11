'use server'

import { db } from '@db/index'
import { cartItemTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import {
  type RemoveProductFromCartSchema,
  removeProductFromCartSchema,
} from './schema'

export async function removeCartProductAction(
  data: RemoveProductFromCartSchema
) {
  removeProductFromCartSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  // Verificar se a variante já existe no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (table) => eq(table?.id, data.cartItemId),
    with: {
      cart: true,
    },
  })

  const cartDoesNotBelongToUser = session.user.id !== cartItem?.cart.userId

  if (cartDoesNotBelongToUser) {
    throw new Error('Unauthorized')
  }

  if (!cartItem) {
    throw new Error('Cart item not found')
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id))
}
