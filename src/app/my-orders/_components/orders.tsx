'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@components/ui/accordion'
import { Badge } from '@components/ui/badge'
import { Card, CardContent } from '@components/ui/card'
import { Separator } from '@components/ui/separator'
import type { orderTable } from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import Image from 'next/image'

interface IOrdersProps {
  orders: {
    id: string
    totalPriceInCents: number
    status: (typeof orderTable.$inferSelect)['status']
    createdAt: Date
    items: {
      id: string
      imageUrl: string
      productName: string
      productVariantName: string
      priceInCents: number
      quantity: number
    }[]
  }[]
}

export function Orders({ orders }: IOrdersProps) {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion collapsible type="single">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col justify-between gap-1">
                    {order.status === 'paid' && <Badge>Pago</Badge>}

                    {order.status === 'pending' && (
                      <Badge variant="outline">Pagamento pendente</Badge>
                    )}

                    {order.status === 'canceled' && (
                      <Badge variant="destructive">Cancelado</Badge>
                    )}

                    <p>
                      Pedido feito em{' '}
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')} às{' '}
                      {new Date(order.createdAt).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {order.items.map((product) => (
                    <div
                      className="flex items-center justify-between"
                      key={product.id}
                    >
                      <div className="flex items-center gap-4">
                        <Image
                          alt={product.productName}
                          className="rounded-lg"
                          height={78}
                          priority={false}
                          src={product.imageUrl}
                          width={78}
                        />

                        <div className="flex flex-col gap-1">
                          <p className="text-xs">{product.productName}</p>
                          <p className="font-medium text-muted-foreground text-xs">
                            {product.productVariantName} x {product.quantity}
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

                  <div className="py-5">
                    <Separator />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Subtotal</p>
                      <p className="font-medium text-muted-foreground text-sm">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Frete</p>
                      <p className="font-medium text-muted-foreground text-sm">
                        GRÁTIS
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Taxa estimada</p>
                      <p className="font-medium text-muted-foreground text-sm">
                        -
                      </p>
                    </div>

                    <div className="flex justify-between">
                      <p className="font-medium text-sm">Total</p>
                      <p className="font-bold text-sm">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
