'use server'

import { db } from '@db/index'
import { cartTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { updateCartShippingAddressSchema } from './schema'

export async function updateCartShippingAddress(data: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    throw new Error('Usuário não autenticado')
  }

  const validatedData = updateCartShippingAddressSchema.parse(data)

  await db
    .update(cartTable)
    .set({
      shippingAddressId: validatedData.shippingAddressId,
    })
    .where(eq(cartTable.userId, session.user.id))

  revalidatePath('/cart/identification')
}
