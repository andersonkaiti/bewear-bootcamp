import { addProductToCartAction } from '@action/add-cart-product'
import { decreaseCartProductQuantityAction } from '@action/decrease-cart-product-quantity'
import { removeCartProductAction } from '@action/remove-cart-product'
import { Button } from '@components/ui/button'
import type {
  cartItemTable,
  productTable,
  productVariantTable,
} from '@db/schema'
import { formatCentsToBRL } from '@helpers/money'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'

interface ICartItemProps {
  item: typeof cartItemTable.$inferSelect & {
    productVariant: typeof productVariantTable.$inferSelect & {
      product: typeof productTable.$inferSelect
    }
  }
}

export function CartItem({ item }: ICartItemProps) {
  const queryClient = useQueryClient()

  const { mutate: removeProductFromCartMutation } = useMutation({
    mutationKey: ['remove-cart-product'],
    mutationFn: () => removeCartProductAction({ cartItemId: item.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
  })

  const { mutate: decreaseCartProductQuantityMutation } = useMutation({
    mutationKey: ['decrease-cart-product-quantity'],
    mutationFn: () =>
      decreaseCartProductQuantityAction({ cartItemId: item.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
  })

  const { mutate: increaseCartProductQuantityMutation } = useMutation({
    mutationKey: ['increase-cart-product-quantity'],
    mutationFn: () =>
      addProductToCartAction({
        productVariantId: item.productVariant.id,
        quantity: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cart'],
      })
    },
  })

  const handleDeleteClick = () => {
    removeProductFromCartMutation(undefined, {
      onSuccess: () => {
        toast.success('Produto removido do carrinho!')
      },
      onError: () => {
        toast.success('Erro ao remover produto do carrinho!')
      },
    })
  }

  const handleDecreaseCartProductQuantityClick = () => {
    decreaseCartProductQuantityMutation(undefined, {
      onSuccess: () => {
        toast.success('Quantidade do produto diminuída!')
      },
      onError: () => {
        toast.success('Erro ao diminuir quantidade do produto!')
      },
    })
  }

  const handleIncreaseCartProductQuantityClick = () => {
    increaseCartProductQuantityMutation(undefined, {
      onSuccess: () => {
        toast.success('Quantidade do produto aumentada!')
      },
      onError: () => {
        toast.success('Erro ao diminuir aumentar a quantidade do produto!')
      },
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          alt={item.productVariant.product.name}
          className="rounded-lg"
          height={78}
          priority={false}
          src={item.productVariant.imageUrl}
          width={78}
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs">{item.productVariant.product.name}</p>
          <p className="font-medium text-muted-foreground text-xs">
            {item.productVariant.name}
          </p>

          <div className="flex w-fit items-center justify-between gap-2 rounded-lg border p-1">
            <Button
              className="size-4"
              onClick={handleDecreaseCartProductQuantityClick}
              size="icon"
              variant="ghost"
            >
              <MinusIcon />
            </Button>
            <p className="text-sm">{item.quantity}</p>
            <Button
              className="size-4"
              onClick={handleIncreaseCartProductQuantityClick}
              size="icon"
              variant="ghost"
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-2">
        <Button onClick={handleDeleteClick} size="icon" variant="outline">
          <TrashIcon />
        </Button>

        <p className="font-semibold text-sm">
          {formatCentsToBRL(item.productVariant.priceInCents)}
        </p>
      </div>
    </div>
  )
}
