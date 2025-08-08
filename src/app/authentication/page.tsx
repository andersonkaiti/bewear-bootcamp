import { Header } from '@components/common/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { SignInForm } from './_components/sign-in-form'
import { SignUpForm } from './_components/sign-up-form'

export default function Authentication() {
  return (
    <>
      <Header />

      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-lg flex-col justify-center gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList className="w-full">
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
