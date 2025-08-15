import { finishOrderAction } from '@action/finish-order'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const getFinishOrderMutationKey = () => ['finish-order'] as const

export function useFinishOrder() {
  const queryClient = useQueryClient()

  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false)

  const mutation = useMutation({
    mutationKey: getFinishOrderMutationKey(),
    mutationFn: finishOrderAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getFinishOrderMutationKey(),
      })
      setSuccessDialogIsOpen(true)
    },
  })

  return {
    ...mutation,
    successDialogIsOpen,
    setSuccessDialogIsOpen,
  }
}
