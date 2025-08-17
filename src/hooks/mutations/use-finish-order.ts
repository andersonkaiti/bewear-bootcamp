import { createCheckoutSessionAction } from '@action/create-checkout-session'
import { finishOrderAction } from '@action/finish-order'
import { env } from '@config/env'
import { loadStripe } from '@stripe/stripe-js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const getFinishOrderMutationKey = () => ['finish-order'] as const

export function useFinishOrder() {
  const queryClient = useQueryClient()

  const [successDialogIsOpen, setSuccessDialogIsOpen] = useState(false)

  const mutation = useMutation({
    mutationKey: getFinishOrderMutationKey(),
    mutationFn: async () => {
      return await finishOrderAction()
    },
    onSuccess: async ({ orderId }) => {
      queryClient.invalidateQueries({
        queryKey: getFinishOrderMutationKey(),
      })

      const id = await createCheckoutSessionAction({
        orderId,
      })

      const stripe = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

      if (!stripe) {
        throw new Error('Failed to load stripe')
      }

      await stripe.redirectToCheckout({
        sessionId: id,
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
