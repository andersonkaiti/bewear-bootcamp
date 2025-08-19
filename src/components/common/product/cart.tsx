import { Button } from '@components/ui/button'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { formatCentsToBRL } from '@helpers/money'
import { useCart } from '@hooks/queries/use-cart'
import { ShoppingBasketIcon } from 'lucide-react'
import Link from 'next/link'
import { CartItem } from './cart-item'

export function Cart() {
  const { data: cart } = useCart({})

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              {cart?.items?.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </ScrollArea>
          </div>

          {cart?.items && cart?.items?.length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />

              <div className="flex items-center justify-between font-medium text-xs">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents) ?? 0}</p>
              </div>

              <Separator />

              <div className="flex items-center justify-between font-medium text-xs">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <div className="flex items-center justify-between font-medium text-xs">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents) ?? 0}</p>
              </div>

              <Button asChild className="rounded-full">
                <Link className="size-full" href="/cart/identification">
                  Finalizar compra
                </Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
