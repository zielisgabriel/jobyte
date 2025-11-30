import Link from "next/link";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { AuthArea } from "./AuthArea";
import { Suspense } from "react";

export function Header() {
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
        
        <Suspense
          fallback={
            <p>
              Carregando...
            </p>
          }
        >
          <AuthArea />
        </Suspense>
      </main>
    </header>
  );
}