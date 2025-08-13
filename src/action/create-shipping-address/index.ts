'use server'

import { db } from '@db/index'
import { shippingAddressTable } from '@db/schema'
import { auth } from '@lib/auth'
import { headers } from 'next/headers'
import {
  type CreateShippingAddressSchema,
  createShippingAddressSchema,
} from './schema'

export async function createShippingAddressAction(
  data: CreateShippingAddressSchema
) {
  createShippingAddressSchema.parse(data)

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await db.insert(shippingAddressTable).values({
    userId: session.user.id,
    recipientName: data.fullName,
    street: data.address,
    number: data.number,
    complement: data.complement,
    city: data.city,
    state: data.state,
    neighborhood: data.neighborhood,
    zipCode: data.cep,
    country: 'Brasil',
    phone: data.phone,
    email: data.email,
    cpfOrCnpj: data.cpf,
  })
}
