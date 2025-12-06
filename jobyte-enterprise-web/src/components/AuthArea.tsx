"use client"

import { useProfileStore } from "@/hooks/useProfileStore"
import { Skeleton } from "./ui/skeleton";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Building2Icon, ChartAreaIcon, LogOutIcon, MenuIcon, SettingsIcon, UserRoundIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

export function AuthArea() {
  const {profile, loading, startLoading, setProfile} = useProfileStore();
  const pathname = usePathname();

  async function getProfileSimple() {
    try {
      startLoading();

      const response = await fetch("/api/profile/simple");
      if (!response.ok) {
        setProfile(null);
        return;
      }
      const profile = await response.json();
      setProfile(profile);
    } catch (error: any) {
      setProfile(null);
      console.error(error);
      toast.error("Error ao buscar perfil");
    }
  }

  useEffect(() => {
    if (!profile) {
      getProfileSimple();
    }
  }, [pathname]);

  return (
    loading ? (
      <div>
        <Skeleton className="w-40 h-10 rounded-lg" />
      </div>
    ) : (
      profile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Building2Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{profile.companyName}</span>
              <MenuIcon className="h-4 w-4 sm:hidden" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"right"}
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
                  onClick={() => signOut({ callbackUrl: "/home" })}
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

          <Button
            size="sm"
            onClick={async () => await signIn("keycloak")}
          >
            Entrar
          </Button>
        </div>
      )
    )
  )
}