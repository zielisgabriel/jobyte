"use client"

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { Building2Icon, LogOutIcon, MenuIcon } from "lucide-react";
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
    <header className={twMerge(clsx("mx-auto px-4 border-b border-border h-[8vh]"))}>
      <main className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <Link
          href={"/home"}
        >
          <span className="flex items-center">
            <h1 className="font-black text-2xl">
              Jobyte.
            </h1>
            <p className="text-md font-semibold">
              nterprise
            </p>
          </span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Building2Icon />
              {profile?.companyName}
            </Button>
          </SheetTrigger>
          <SheetContent
            side={isMobile ? "top" : "right"}
            className="pb-4"
          >
            <SheetHeader>
              <SheetTitle>
                Jobyte Enterprise
              </SheetTitle>
              <SheetDescription>
                {profile?.companyName}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col">
              <Separator className="mb-4" />
              <Link href="/profile">
                <Button variant={"link"}>
                  Meu perfil
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button variant={"link"}>
                  Dashboard
                </Button>
              </Link>
              
              <Link href="/settings">
                <Button variant={"link"}>
                  Configurações
                </Button>
              </Link>

              <Button
                variant={"link"}
                className="justify-start text-red-400"
                onClick={async () => await logout()}
              >
                <LogOutIcon />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </main>
    </header>
  );
}