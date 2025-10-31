"use client"

import Link from "next/link";
import { Button } from "./ui/Button";
import { usePathname } from "next/navigation";
import { pagesWithoutHeader } from "@/environments/pagesWithoutHeader";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import { Separator } from "radix-ui";

export function Header() {
  const pathname = usePathname();
  const {isMobile} = useMobile();

  if (pagesWithoutHeader.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <header className={twMerge(clsx("mx-auto px-2 border-b border-foreground h-[6vh]"))}>
      <main className="flex justify-between items-center max-w-7xl mx-auto h-full">
        <span className="flex items-center">
          <h1 className="font-black text-2xl">
            Jobyte.
          </h1>
          <p className="text-md font-semibold">
            nterprise
          </p>
        </span>
        <ul className="flex gap-1 justify-end">
          <li>
            <Link
              href={"/enterprise/register"}
              title="Cadastrar"
            >
              <Button variant={"ghost"}>
                Cadastrar
              </Button>
            </Link>
          </li>
          <li>
            <Button>
              Entrar
            </Button>
          </li>
        </ul>
      </main>
    </header>
  );
}