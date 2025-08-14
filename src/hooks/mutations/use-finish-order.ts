import { finishOrderAction } from '@action/finish-order'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const getFinishOrderMutationKey = () => ['finish-order'] as const

export function useFinishOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: getFinishOrderMutationKey(),
    mutationFn: finishOrderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getFinishOrderMutationKey(),
      })
    },
  })
}
