import { createShippingAddressAction } from '@action/create-shipping-address'
import type { CreateShippingAddressSchema } from '@action/create-shipping-address/schema'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const createShippingAddressMutationKey = () => [
  'create-shipping-address',
]

export function useCreateShippingAddress() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddressAction(data),
    mutationKey: createShippingAddressMutationKey(),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
