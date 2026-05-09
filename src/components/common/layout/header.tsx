'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { Button } from '@components/ui/button'
import { Separator } from '@components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet'
import { getUserInitials } from '@helpers/user-initials'
import { authClient } from '@lib/auth-client'
import { LogInIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Cart } from '../product/cart'

export function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header className="flex items-center justify-between p-5 lg:mx-auto lg:max-w-7xl lg:px-10">
      <div className="flex items-center gap-8">
        <Link href="/">
          <Image alt="BEWEAR" height={26.14} src="/logo.svg" width={100} />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          <Link
            className="text-sm font-medium transition-opacity hover:opacity-70"
            href="/"
          >
            Início
          </Link>
          {session?.user && (
            <Link
              className="text-sm font-medium transition-opacity hover:opacity-70"
              href="/my-orders"
            >
              Meus Pedidos
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="px-5">
              {session?.user ? (
                <div className="flex justify-between space-y-6">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={session?.user?.image as string | undefined}
                      />
                      <AvatarFallback>
                        {getUserInitials(session.user.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-semibold">{session?.user?.name}</h3>
                      <span className="block text-muted-foreground text-xs">
                        {session?.user?.email}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => authClient.signOut()}
                    size="icon"
                    variant="outline"
                  >
                    <LogOutIcon />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <h2>Olá. Faça seu login!</h2>
                  <Button asChild size="icon" variant="outline">
                    <Link href="/authentication">
                      <LogInIcon />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {session?.user && (
          <div className="hidden items-center gap-3 lg:flex">
            <Avatar>
              <AvatarImage src={session.user.image as string | undefined} />
              <AvatarFallback>
                {getUserInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{session.user.name}</p>
              <p className="text-muted-foreground text-xs">
                {session.user.email}
              </p>
            </div>
            <Button
              onClick={() => authClient.signOut()}
              size="icon"
              variant="outline"
            >
              <LogOutIcon />
            </Button>
          </div>
        )}

        {!session?.user && (
          <Button
            asChild
            className="hidden lg:flex"
            size="sm"
            variant="outline"
          >
            <Link href="/authentication">
              <LogInIcon />
              Entrar
            </Link>
          </Button>
        )}

        {session?.user && (
          <>
            <Separator className="!h-5" orientation="vertical" />
            <Cart />
          </>
        )}
      </div>
    </header>
  )
}
