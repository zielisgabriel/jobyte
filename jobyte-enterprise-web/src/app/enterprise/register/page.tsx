"use client";

import { EnterpriseRegisterForm } from "@/components/EnterpriseRegisterForm";
import { Button } from "@/components/ui/Button";
import { useMobile } from "@/hooks/useMobile";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function RegisterPage() {
  const {isMobile} = useMobile();

  return (
    <main className={twMerge(clsx("grid grid-cols-[1fr_1fr] h-screen", isMobile && "flex"))}>
      <div className={twMerge(clsx("flex flex-col justify-center items-center bg-background", isMobile && "hidden"))}>
        <h1 className="font-bold text-5xl text-foreground">Jobyte.</h1>
        <h2 className="font-semibold text-xl text-foreground/80 mt-2">Empresas</h2>
      </div>
      <div className="relative w-full p-2 bg-foreground">
        <Link
          href="/"
          title="Página inicial"
        >
          <Button
            className="absolute left-1 top-1"
            variant={"color_invert"}
          >
            <ArrowLeft />
            Início
          </Button>
        </Link>
        <EnterpriseRegisterForm />
      </div>
    </main>
  );
}