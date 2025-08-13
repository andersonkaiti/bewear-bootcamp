'use client'

import { Button } from '@components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group'
import type { shippingAddressTable } from '@db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateShippingAddress } from '@hooks/mutations/use-create-shipping-address'
import { useUpdateCartShippingAddress } from '@hooks/mutations/use-update-cart-shipping-address'
import { useShippingAddresses } from '@hooks/queries/use-shipping-addresses'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import { toast } from 'sonner'
import z from 'zod'

const addressFormSchema = z.object({
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

type AddressFormState = z.infer<typeof addressFormSchema>

interface IAddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[]
  defaultShippingAddressId: string | null
}

export function Addresses({
  shippingAddresses,
  defaultShippingAddressId,
}: IAddressesProps) {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    defaultShippingAddressId
  )

  const { data: addresses, isLoading: isLoadingAddresses } =
    useShippingAddresses({ initialData: shippingAddresses })

  const { mutate: createShippingAddressMutation, isPending } =
    useCreateShippingAddress()

  const {
    mutate: updateCartShippingAddressMutation,
    isPending: isUpdatingCart,
  } = useUpdateCartShippingAddress()

  const form = useForm<AddressFormState>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      email: '',
      fullName: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
  })

  function onSubmit(values: AddressFormState) {
    createShippingAddressMutation(values, {
      onSuccess: (newAddress) => {
        toast.success('Endereço salvo com sucesso!')
        form.reset()
        setSelectedAddress(null)

        if (newAddress && 'id' in newAddress) {
          updateCartShippingAddressMutation({
            shippingAddressId: newAddress.id,
          })
        }
      },
      onError: () => {
        toast.error('Erro ao salvar endereço. Tente novamente.')
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup onValueChange={setSelectedAddress} value={selectedAddress}>
          {isLoadingAddresses ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <>
              {addresses?.map((address) => (
                <Card className="mb-4" key={address.id}>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id={address.id} value={address.id} />
                      <Label
                        className="flex-1 cursor-pointer"
                        htmlFor={address.id}
                      >
                        <p>
                          {address.recipientName}, {address.street},{' '}
                          {address.number}
                          {address.complement && `, ${address.complement}`},{' '}
                          {address.neighborhood}, {address.city} -{' '}
                          {address.state}, CEP: {address.zipCode}
                        </p>
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem id="add_new" value="add_new" />
                    <Label htmlFor="add_new">Adicionar novo endereço</Label>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </RadioGroup>

        {selectedAddress && selectedAddress !== 'add_new' && (
          <div className="mt-4">
            <Button
              className="w-full rounded-full"
              disabled={isUpdatingCart}
              onClick={() => {
                updateCartShippingAddressMutation({
                  shippingAddressId: selectedAddress,
                })
              }}
            >
              {isUpdatingCart ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Continuar com o pagamento'
              )}
            </Button>
          </div>
        )}

        {selectedAddress === 'add_new' && (
          <Card className="mt-4">
            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite seu e-mail" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite seu nome completo"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cpf"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="###.###.###-##"
                              placeholder="000.000.000-00"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="(##) #####-####"
                              placeholder="(00) 00000-0000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cep"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <PatternFormat
                              customInput={Input}
                              format="#####-###"
                              placeholder="00000-000"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o endereço" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o número" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Digite o complemento (opcional)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite a cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="Digite o estado" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button className="w-full" disabled={isPending} type="submit">
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      'Salvar endereço'
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
