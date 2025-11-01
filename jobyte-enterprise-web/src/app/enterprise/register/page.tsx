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
        <span className="flex items-center">
          <h1 className="font-black text-5xl">
            Jobyte.
          </h1>
          <p className="text-xl font-semibold">
            nterprise
          </p>
        </span>
      </div>
      <div className="relative w-full p-2 bg-foreground">
        <Link
          href="/"
          title="Página inicial"
          className="flex"
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