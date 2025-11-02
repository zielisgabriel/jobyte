"use client"

import Link from "next/link";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { pagesWithoutHeader } from "@/environments/pagesWithoutHeader";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { DropdownMenu, Separator } from "radix-ui";
import { MenuIcon } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const {isMobile} = useMobile();

  if (pagesWithoutHeader.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className={twMerge(clsx("mx-auto px-4 border-b border-foreground h-[8vh]"))}>
      <main className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <Link
          href={"/"}
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild className="focus:outline-0">
              <Button variant={"ghost"}>
                <MenuIcon />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="bg-background border border-foreground rounded-md p-2 flex flex-col gap-1"
                sideOffset={5}
              >
                <DropdownMenu.Item asChild className="hover:outline-0">
                  <Link
                    href={"/"}
                    className="flex w-full"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Candidato
                    </Button>
                  </Link>
                </DropdownMenu.Item>

                <Separator.Root className="w-full bg-foreground h-px my-0.5" />

                <DropdownMenu.Item asChild className="hover:outline-0">
                  <Link
                    href={"/enterprise/register"}
                    className="flex w-full"
                  >
                    <Button variant={"ghost"} className="w-full">
                      Cadastrar
                    </Button>
                  </Link>
                </DropdownMenu.Item>

                <Separator.Root className="w-full bg-foreground h-px my-0.5" />

                <DropdownMenu.Item asChild className="hover:outline-0">
                  <Link
                    href={"/enterprise/login"}
                    className="flex w-full"
                  >
                    <Button variant={"default"} className="w-full">
                      Entrar
                    </Button>
                  </Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        ) : (
          <ul className="flex gap-1 justify-end">
            <li>
              <Link
                href={"/"}
                className="flex"
              >
                <Button variant={"ghost"}>
                  Candidato
                </Button>
              </Link>
            </li>
            {pathname !== "/dashboard" && (
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
            <Separator.Root className="w-px bg-foreground my-2 mx-2" />
            <li>
              <Link
                href={"/enterprise/register"}
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
                href={"/enterprise/login"}
                title="Entrar"
                className="flex"
              >
                <Button variant={"default"}>
                  Entrar
                </Button>
              </Link>
            </li>
          </ul>
        )}
      </main>
    </header>
  );
}