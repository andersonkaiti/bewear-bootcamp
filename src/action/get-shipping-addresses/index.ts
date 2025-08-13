'use server'

import { db } from '@db/index'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'

export async function getShippingAddressesAction() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  const addresses = await db.query.shippingAddressTable.findMany({
    where: (table) => eq(table.userId, session.user.id),
    orderBy: (table) => [table.createdAt],
  })

  return addresses
}
