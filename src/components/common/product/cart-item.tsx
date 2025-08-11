import { Button } from '@components/ui/button'
import type { productTable, productVariantTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'

interface ICartItemProps {
  productVariant: typeof productVariantTable.$inferSelect & {
    product: typeof productTable.$inferSelect
  }
}

export function CartItem({ productVariant }: ICartItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          alt={productVariant.product.name}
          className="rounded-lg"
          height={78}
          src={productVariant.imageUrl}
          width={78}
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs">{productVariant.product.name}</p>
          <p className="font-medium text-muted-foreground text-xs">
            {productVariant.name}
          </p>

          <div className="flex w-[70px] items-center justify-between rounded-lg border p-1">
            <Button className="size-4" size="icon" variant="ghost">
              <MinusIcon />
            </Button>
            <p className="text-sm">1</p>
            <Button className="size-4" size="icon" variant="ghost">
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button size="icon" variant="outline">
          <TrashIcon />
        </Button>

        <p className="font-semibold text-sm">
          {formatCentsToBRL(productVariant.priceInCents)}
        </p>
      </div>
    </div>
  )
}
