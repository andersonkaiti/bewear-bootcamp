import { getCart } from '@action/get-cart'
import { Button } from '@components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { useQuery } from '@tanstack/react-query'
import { ShoppingBasketIcon } from 'lucide-react'
import { CartItem } from './cart-item'

export function Cart() {
  const { data: cart, isPending: cartIsPending } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart(),
  })

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

        <div className="space-y-4 px-5">
          {cartIsPending && <div>Pending...</div>}

          {cart?.items?.map((item) => (
            <CartItem key={item.id} productVariant={item.productVariant} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
