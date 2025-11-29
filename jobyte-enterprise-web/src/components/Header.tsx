"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { Building2Icon, ChartAreaIcon, LogOutIcon, MenuIcon, SettingsIcon, UserRoundIcon } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AUTH_PATHS } from "@/environments/AUTH_PATHS";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";

export function Header() {
  const pathname = usePathname();
  const {isMobile} = useMobile();
  const {profile, logout} = useContext(AuthContext);

  if (AUTH_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className={twMerge(clsx("sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"))}>
      <main className="flex justify-between items-center max-w-7xl mx-auto h-16 px-4">
        <Link href="/home" className="flex items-center gap-1 group">
          <h1 className="font-black text-2xl transition-colors group-hover:text-primary">
            Jobyte.
          </h1>
          <p className="text-sm font-semibold text-muted-foreground">
            nterprise
          </p>
        </Link>
        
        {profile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Building2Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{profile.companyName}</span>
                <MenuIcon className="h-4 w-4 sm:hidden" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isMobile ? "top" : "right"}
              className="pb-4"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Building2Icon className="h-5 w-5" />
                  Jobyte Enterprise
                </SheetTitle>
                <SheetDescription>
                  {profile.companyName}
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col mt-4">
                <Separator className="mb-4" />
                <nav className="flex flex-col gap-1">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <UserRoundIcon className="h-4 w-4" />
                      Meu perfil
                    </Button>
                  </Link>

                  <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <ChartAreaIcon className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  
                  <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <SettingsIcon className="h-4 w-4" />
                      Configurações
                    </Button>
                  </Link>

                  <Separator className="my-2" />

                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={async () => await logout()}
                  >
                    <LogOutIcon className="h-4 w-4" />
                    Sair
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/register">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Cadastrar
              </Button>
            </Link>

            <Link href="/login">
              <Button size="sm">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </main>
    </header>
  );
}