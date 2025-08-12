import { addProductToCartAction } from '@action/add-cart-product'
import { getUserCartQueryKey } from '@hooks/queries/use-cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const getIncreaseCartProductQuantityMutationKey = (
  productVariantId: string
) => ['increase-cart-product-quantity', productVariantId] as const

export function useIncreaseCartProductQuantity(productVariantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getIncreaseCartProductQuantityMutationKey(productVariantId),
    mutationFn: () =>
      addProductToCartAction({
        productVariantId,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserCartQueryKey(),
      })
    },
  })
}
