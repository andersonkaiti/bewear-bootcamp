'use client'

import { addProductToCart } from '@action/add-cart-product'
import { Button } from '@components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface IAddToCartButtonProps {
  productVariantId: string
  quantity: number
}

export function AddToCartButton({
  productVariantId,
  quantity,
}: IAddToCartButtonProps) {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationKey: ['addProductToCart', productVariantId, quantity],
    mutationFn: () => addProductToCart({ productVariantId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      toast.success('Produto adicionado com sucesso!')
    },
  })

  return (
    <Button
      className="rounded-full"
      disabled={isPending}
      onClick={() => mutate()}
      size="lg"
      variant="outline"
    >
      {isPending && <Loader2 className="mr-1 animate-spin" />}
      Adicionar à sacola
    </Button>
  )
}
