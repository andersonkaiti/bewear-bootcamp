import { getCart } from '@action/get-cart'
import { useQuery } from '@tanstack/react-query'

export const getUserCartQueryKey = () => ['cart'] as const

export function useCart(params: {
  initialData?: Awaited<ReturnType<typeof getCart>>
}) {
  return useQuery({
    queryKey: getUserCartQueryKey(),
    queryFn: () => getCart(),
    initialData: params?.initialData,
  })
}
