import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import { formatCentsToBRL } from '@helpers/money'
import Image from 'next/image'

interface ICartSummaryProps {
  subtotalInCents: number
  totalInCents: number
  products: {
    id: string
    name: string
    variantName: string
    quantity: number
    priceInCents: number
    imageUrl: string
  }[]
}

export function CartSummary({
  subtotalInCents,
  totalInCents,
  products,
}: ICartSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-sm">Subtotal</p>
          <p className="font-medium text-muted-foreground text-sm">
            {formatCentsToBRL(subtotalInCents)}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-sm">Frete</p>
          <p className="font-medium text-muted-foreground text-sm">GRÁTIS</p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-sm">Taxa estimada</p>
          <p className="font-medium text-muted-foreground text-sm">-</p>
        </div>

        <div className="flex justify-between">
          <p className="font-medium text-sm">Total</p>
          <p className="font-bold text-sm">{formatCentsToBRL(totalInCents)}</p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        {products.map((product) => (
          <div className="flex items-center justify-between" key={product.id}>
            <div className="flex items-center gap-4">
              <Image
                alt={product.name}
                className="rounded-lg"
                height={78}
                priority={false}
                src={product.imageUrl}
                width={78}
              />

              <div className="flex flex-col gap-1">
                <p className="text-xs">{product.name}</p>
                <p className="font-medium text-muted-foreground text-xs">
                  {product.variantName}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end justify-center gap-2">
              <p className="font-semibold text-sm">
                {formatCentsToBRL(product.priceInCents)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
