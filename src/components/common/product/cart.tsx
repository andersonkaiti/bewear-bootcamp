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
import Image from 'next/image'

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

        <div className="grid grid-cols-3 gap-2 px-5">
          {cartIsPending && <div>Pending...</div>}

          {cart?.items?.map((item) => (
            <div key={item.id}>
              <Image
                alt={item.productVariant.name}
                className="h-auto w-full"
                height={0}
                sizes="100vw"
                src={item.productVariant.imageUrl}
                width={0}
              />
              <div>
                <h3>{item.productVariant.product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
