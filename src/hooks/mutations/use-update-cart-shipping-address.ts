import { updateCartShippingAddress } from '@action/update-cart-shipping-address'
import type { UpdateCartShippingAddressInput } from '@action/update-cart-shipping-address/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const updateCartShippingAddressMutationKey = () => [
  'update-cart-shipping-address',
]

export function useUpdateCartShippingAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: updateCartShippingAddressMutationKey(),
    mutationFn: (data: UpdateCartShippingAddressInput) => {
      return updateCartShippingAddress(data)
    },
    onSuccess: () => {
      toast.success('Endereço vinculado ao carrinho com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: () => {
      toast.error('Erro ao vincular endereço ao carrinho. Tente novamente.')
    },
  })
}
