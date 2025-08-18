'use client'

import { Header } from '@components/common/layout/header'
import { Button } from '@components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@components/ui/dialog'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <>
      <Header />

      <Dialog open={true}>
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
