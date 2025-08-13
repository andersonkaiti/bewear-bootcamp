import z from 'zod'

export const createShippingAddressSchema = z.object({
  email: z.email('E-mail inválido.'),
  fullName: z.string().min(1, 'Nome completo é obrigatório.'),
  cpf: z.string().min(14, 'CPF é obrigatório.').max(14, 'CPF inválido.'),
  phone: z
    .string()
    .min(15, 'Celular é obrigatório.')
    .max(15, 'Celular inválido.'),
  cep: z.string().min(9, 'CEP é obrigatório.').max(9, 'CEP inválido.'),
  address: z.string().min(1, 'Endereço é obrigatório.'),
  number: z.string().min(1, 'Número é obrigatório.'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório.'),
  city: z.string().min(1, 'Cidade é obrigatória.'),
  state: z.string().min(1, 'Estado é obrigatório.'),
})

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>
