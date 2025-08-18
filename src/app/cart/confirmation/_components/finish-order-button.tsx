'use client'

import { Button } from '@components/ui/button'
import { useFinishOrder } from '@hooks/mutations/use-finish-order'
import { Loader2 } from 'lucide-react'

export function FinishOrderButton() {
  const { mutate: finishOrderMutation, isPending } = useFinishOrder()

  return (
    <Button
      className="w-full rounded-full"
      disabled={isPending}
      onClick={() => finishOrderMutation()}
      size="lg"
    >
      {isPending && <Loader2 className="size-4 animate-spin" />}
      Finalizar compra
    </Button>
  )
}
