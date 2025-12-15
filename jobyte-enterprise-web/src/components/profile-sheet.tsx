"use client";

import { ProfileSimple } from "@/types/profile-simple";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Building2Icon, ChartAreaIcon, LogOutIcon, MenuIcon, SettingsIcon, UserRoundIcon, PlusIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ProfileSheetProps {
  profile: ProfileSimple
}

export function ProfileSheet({ profile }: ProfileSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Building2Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{profile.companyName}</span>
          <MenuIcon className="h-4 w-4 sm:hidden" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col py-4">
        <SheetHeader className="text-left">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building2Icon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="truncate">
                {profile.companyName}
              </SheetTitle>
              <SheetDescription className="truncate">
                Jobyte Enterprise
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Separator />

        <nav className="flex-1 flex flex-col gap-1">
          <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
            Menu Principal
          </p>

          <Button variant="ghost" className="w-full justify-start gap-3 h-11" asChild>
            <Link href="/dashboard">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <ChartAreaIcon className="h-4 w-4 text-primary" />
              </div>
              <span>Dashboard</span>
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-11" asChild>
            <Link href="/profile">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <UserRoundIcon className="h-4 w-4 text-purple-500" />
              </div>
              <span>Meu Perfil</span>
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-3 h-11" asChild>
            <Link href="/dashboard/vacancy/create">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <PlusIcon className="h-4 w-4 text-blue-500" />
              </div>
              <span>Nova Vaga</span>
            </Link>
          </Button>

          <Separator className="my-4" />

          <p className="text-xs font-medium text-muted-foreground px-2 mb-2">
            Configurações
          </p>

          <Button variant="ghost" className="w-full justify-start gap-3 h-11" asChild>
            <Link href="/settings">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <SettingsIcon className="h-4 w-4 text-amber-500" />
              </div>
              <span>Configurações</span>
            </Link>
          </Button>
        </nav>

        <Separator />

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={() => signOut({ callbackUrl: "/home" })}
        >
          <div className="h-8 w-8 rounded-lg bg-destructive/10 flex items-center justify-center">
            <LogOutIcon className="h-4 w-4" />
          </div>
          <span>Sair da conta</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}