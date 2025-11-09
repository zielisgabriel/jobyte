"use client"

import Link from "next/link";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { DropdownMenu, Separator } from "radix-ui";
import { Building2Icon, MenuIcon } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AUTH_PATHS } from "@/environments/AUTH_PATHS";
import { DropdownMenuItem, DropdownMenuRoot, DropdownMenuTrigger, MenuSeparator } from "./ui/Dropdown";

export function Header() {
  const pathname = usePathname();
  const {isMobile} = useMobile();
  const {profile} = useContext(AuthContext);

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
            <p className="text-md font-semibold">
              nterprise
            </p>
          </span>
        </Link>
        {isMobile ? (
          <DropdownMenuRoot>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-background border border-foreground rounded-md p-2 flex flex-col gap-1"
                sideOffset={5}
              >
                <DropdownMenuItem asChild>
                  <Link
                    href={"/"}
                    className="flex w-full"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Área do candidato
                    </Button>
                  </Link>
                </DropdownMenuItem>

                <MenuSeparator />

                {!profile ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href={"/register"}
                        className="flex w-full"
                      >
                        <Button variant={"ghost"} className="w-full">
                          Cadastrar
                        </Button>
                      </Link>
                    </DropdownMenuItem>

                    <MenuSeparator />

                    <DropdownMenuItem asChild>
                      <Link
                        href={"/login"}
                        className="flex w-full"
                      >
                        <Button variant={"default"} className="w-full">
                          Entrar
                        </Button>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuRoot>
                      <DropdownMenuTrigger asChild>
                        <Button className="w-full flex justify-between">
                          <p>Zielis</p>
                          <Building2Icon size={18} />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenu.Content
                        className="bg-background border border-foreground rounded-md p-2 flex flex-col gap-1"
                        sideOffset={5}
                      >
                        <DropdownMenuItem asChild>
                          <Link
                            href={"/settings"}
                            className="flex w-full"
                          >
                            <Button variant={"ghost"} className="w-full">
                              Configurações
                            </Button>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenu.Content>
                    </DropdownMenuRoot>
                  </>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenuRoot>
        ) : (
          <ul className="flex gap-1 justify-end">
            <li>
              <Link
                href={"/"}
                className="flex"
              >
                <Button variant={"ghost"}>
                  Área do candidato
                </Button>
              </Link>
            </li>
            {pathname !== "/dashboard" && profile && (
              <li>
                <Link
                  href={"/dashboard"}
                  className="flex"
                >
                  <Button variant={"outline"}>
                    Dashboard
                  </Button>
                </Link>
              </li>
            )}
            {!profile ? (
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
            ) : (
              <li>
                <Button>
                  <p>Zielis</p>
                  <Building2Icon size={18} />
                </Button>
              </li>
            )}
          </ul>
        )}
      </main>
    </header>
  );
}