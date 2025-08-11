'use client'

import { Button } from '@components/ui/button'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { AddToCartButton } from './add-to-cart-button'

interface IProductActionsProps {
  productVariantId: string
}

export function ProductActions({ productVariantId }: IProductActionsProps) {
  const [quantity, setQuantity] = useState(1)

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }
  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>

          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button onClick={handleDecrement} size="icon" variant="ghost">
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button onClick={handleIncrement} size="icon" variant="ghost">
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />

        <Button className="rounded-full">Comprar agora</Button>
      </div>
    </>
  )
}
