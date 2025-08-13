import { Header } from '@components/common/layout/header'
import { db } from '@db/index'
import { cartTable, shippingAddressTable } from '@db/schema'
import { auth } from '@lib/auth'
import { eq } from 'drizzle-orm'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Addresses } from './_components/addresses'

export default async function IdentificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/login')
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session?.user.id),
    with: {
      items: true,
    },
  })

  if (!cart || cart.items.length === 0) {
    redirect('/')
  }

  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  })

  return (
    <>
      <Header />

      <div className="px-5">
        <Addresses shippingAddresses={shippingAddresses} />
      </div>
    </>
  )
}
