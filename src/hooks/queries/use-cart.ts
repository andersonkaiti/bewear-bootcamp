import { getCart } from '@action/get-cart'
import { useQuery } from '@tanstack/react-query'

export const getUserCartQueryKey = () => ['cart'] as const

export function useCart() {
  return useQuery({
    queryKey: getUserCartQueryKey(),
    queryFn: () => getCart(),
  })
}
