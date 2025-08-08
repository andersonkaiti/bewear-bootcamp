'use client'

import { Button } from '@components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@lib/auth-client'
import { Loader2 } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

const formSchema = z
  .object({
    name: z.string('Nome inválido.').trim().min(1, 'Nome é obrigatório.'),
    email: z.email('E-mail inválido.'),
    password: z.string().min(8, 'Senha inválida.'),
    passwordConfirmation: z.string('Senha inválida.').min(8, 'Senha invalida!'),
  })
  .refine((data) => data.passwordConfirmation === data.password, {
    message: 'As senhas não coincidem.',
    path: ['passwordConfirmation'],
  })

type FormState = z.infer<typeof formSchema>

const BASE_ERROR_MESSAGES = {
  USER_NOT_FOUND: 'Usuário não encontrado.',
  FAILED_TO_CREATE_USER: 'Falha ao criar usuário.',
  FAILED_TO_CREATE_SESSION: 'Falha ao criar sessão.',
  FAILED_TO_UPDATE_USER: 'Falha ao atualizar usuário.',
  FAILED_TO_GET_SESSION: 'Falha ao obter sessão.',
  INVALID_PASSWORD: 'Senha inválida.',
  INVALID_EMAIL: 'E-mail inválido.',
  INVALID_EMAIL_OR_PASSWORD: 'E-mail ou senha inválidos.',
  SOCIAL_ACCOUNT_ALREADY_LINKED: 'Conta social já vinculada.',
  PROVIDER_NOT_FOUND: 'Provedor não encontrado.',
  INVALID_TOKEN: 'Token inválido.',
  ID_TOKEN_NOT_SUPPORTED: 'ID Token não suportado.',
  FAILED_TO_GET_USER_INFO: 'Falha ao obter informações do usuário.',
  USER_EMAIL_NOT_FOUND: 'E-mail do usuário não encontrado.',
  EMAIL_NOT_VERIFIED: 'E-mail não verificado.',
  PASSWORD_TOO_SHORT: 'Senha muito curta.',
  PASSWORD_TOO_LONG: 'Senha muito longa.',
  USER_ALREADY_EXISTS: 'Usuário já existe.',
  EMAIL_CAN_NOT_BE_UPDATED: 'E-mail não pode ser atualizado.',
  CREDENTIAL_ACCOUNT_NOT_FOUND: 'Conta de credencial não encontrada.',
  SESSION_EXPIRED: 'Sessão expirada.',
  FAILED_TO_UNLINK_LAST_ACCOUNT: 'Falha ao desvincular a última conta.',
  ACCOUNT_NOT_FOUND: 'Conta não encontrada.',
  USER_ALREADY_HAS_PASSWORD: 'Usuário já possui senha.',
}

export function SignUpForm() {
  const form = useForm<FormState>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  async function onSubmit(values: FormState) {
    await authClient.signUp.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          toast.success('Conta criada com sucesso!')

          redirect('/')
        },
        onError: (ctx) => {
          toast.error(
            BASE_ERROR_MESSAGES[
              ctx.error.code as keyof typeof BASE_ERROR_MESSAGES
            ]
          )

          if (ctx.error.code === BASE_ERROR_MESSAGES.USER_ALREADY_EXISTS) {
            form.setError('email', {
              message: 'E-mail já cadastrado',
            })
          }
        },
      },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
        <CardDescription>Crie uma conta para continuar.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme sua senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirme sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                'Criar conta'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
