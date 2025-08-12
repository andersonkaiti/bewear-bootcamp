import { decreaseCartProductQuantityAction } from '@action/decrease-cart-product-quantity'
import { getUserCartQueryKey } from '@hooks/queries/use-cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const getDecreaseCartProductQuantity = (cartItemId: string) =>
  ['decrease-cart-product-quantity', cartItemId] as const

export function useDecreaseCartProductQuantity(cartItemId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getDecreaseCartProductQuantity(cartItemId),
    mutationFn: () => decreaseCartProductQuantityAction({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserCartQueryKey(),
      })
    },
  })
}
