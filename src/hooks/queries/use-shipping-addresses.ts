import { getShippingAddressesAction } from '@action/get-shipping-addresses'
import { useQuery } from '@tanstack/react-query'

export const shippingAddressesQueryKey = () => ['shipping-addresses']

export function useShippingAddresses() {
  return useQuery({
    queryKey: shippingAddressesQueryKey(),
    queryFn: getShippingAddressesAction,
  })
}
