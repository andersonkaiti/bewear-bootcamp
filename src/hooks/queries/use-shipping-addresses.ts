import { getShippingAddressesAction } from '@action/get-shipping-addresses'
import type { shippingAddressTable } from '@db/schema'
import { useQuery } from '@tanstack/react-query'

export const shippingAddressesQueryKey = () => ['shipping-addresses']

export function useShippingAddresses({
  initialData,
}: {
  initialData: (typeof shippingAddressTable.$inferSelect)[]
}) {
  return useQuery({
    queryKey: shippingAddressesQueryKey(),
    queryFn: getShippingAddressesAction,
    initialData,
  })
}
