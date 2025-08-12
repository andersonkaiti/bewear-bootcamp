import { addProductToCartAction } from '@action/add-cart-product'
import { getUserCartQueryKey } from '@hooks/queries/use-cart'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const getIncreaseCartProjectQuantityMutationKey = (
  productVariantId: string
) => ['increase-cart-product-quantity', productVariantId] as const

export function useIncreaseCartProjectQuantity(productVariantId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getIncreaseCartProjectQuantityMutationKey(productVariantId),
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
