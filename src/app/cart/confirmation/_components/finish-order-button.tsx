'use client'

import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@components/ui/dialog'
import { useFinishOrder } from '@hooks/mutations/use-finish-order'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function FinishOrderButton() {
  const {
    mutate: finishOrderMutation,
    isPending,
    successDialogIsOpen,
    setSuccessDialogIsOpen,
  } = useFinishOrder()

  return (
    <>
      <Button
        className="w-full rounded-full"
        disabled={isPending}
        onClick={() => finishOrderMutation()}
        size="lg"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        Finalizar compra
      </Button>

      <Dialog onOpenChange={setSuccessDialogIsOpen} open={successDialogIsOpen}>
        <DialogContent className="text-center">
          <Image
            alt="Success"
            className="mx-auto"
            height={300}
            src="/illustration.svg"
            width={300}
          />

          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>

          <DialogDescription className="text-balance font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full" size="lg">
              Ver meus pedidos
            </Button>

            <Button asChild className="rounded-full" size="lg" variant="ghost">
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
