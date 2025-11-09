"use client"

import Link from "next/link";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { DropdownMenu } from "radix-ui";
import { LogOutIcon, UserIcon, UserPenIcon } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AUTH_PATHS } from "@/environments/AUTH_PATHS";
import { DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger, MenuSeparator } from "./ui/Dropdown";

export function Header() {
  const pathname = usePathname();
  const {isMobile} = useMobile();
  const {profile, logout} = useContext(AuthContext);

  if (AUTH_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className={twMerge(clsx("mx-auto px-4 border-b border-foreground h-[8vh]"))}>
      <main className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <Link
          href={"/home"}
        >
          <span className="flex items-center">
            <h1 className="font-black text-2xl">
              Jobyte.
            </h1>
          </span>
        </Link>
        <ul className="flex gap-2">
          {profile ? (
            <DropdownMenuRoot>
              <DropdownMenuTrigger asChild>
                <Button>
                  <UserIcon size={16} />
                  {
                    profile.fullName.split(" ")[0]
                  }
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenu.Content className="mt-1 bg-foreground rounded">
                <DropdownMenuItem asChild>
                  <Link
                    href={"/profile/me"}
                  >
                    <Button className="w-full">
                      <UserPenIcon size={18} />
                      Meu Perfil
                    </Button>
                  </Link>
                </DropdownMenuItem>
                <MenuSeparator className="bg-background" />
                <DropdownMenuItem asChild>
                  <Button
                    className="w-full text-red-400"
                    onClick={async () => await logout()}
                  >
                    <LogOutIcon />
                    Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenu.Content>
            </DropdownMenuRoot>
          ) : (
            <>
              <li>
                <Link
                  href={"/register"}
                  title="Cadastrar"
                  className="flex"
                >
                  <Button variant={"outline"}>
                    Cadastrar
                  </Button>
                </Link>
              </li>
              <li>
                <Link
                  href={"/login"}
                  title="Entrar"
                  className="flex"
                >
                  <Button variant={"default"}>
                    Entrar
                  </Button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </main>
    </header>
  );
}