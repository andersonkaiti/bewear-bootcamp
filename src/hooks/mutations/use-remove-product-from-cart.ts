import { removeCartProductAction } from '@action/remove-cart-product'
import { getUserCartQueryKey } from '@hooks/queries/use-cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ['remove-cart-product', cartItemId] as const

export function useRemoveProductFromCart(cartItemId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: () => removeCartProductAction({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserCartQueryKey(),
      })
    },
  })
}
