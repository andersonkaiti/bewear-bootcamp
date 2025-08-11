import z from 'zod'

export const removeProductFromCartSchema = z.object({
  cartItemId: z.string(),
})

export type RemoveProductFromCartSchema = z.infer<
  typeof removeProductFromCartSchema
>
