"use client";

import { EnterpriseRegisterForm } from "@/components/EnterpriseRegisterForm";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/useMobile";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function RegisterPage() {
  const { isMobile } = useMobile();
  const router = useRouter();

  return (
    <main
      className={twMerge(
        clsx("grid grid-cols-[1fr_1fr] h-screen", isMobile && "flex")
      )}
    >
      <div
        className={twMerge(
          clsx(
            "flex flex-col justify-center items-center bg-background",
            isMobile && "hidden"
          )
        )}
      >
        <span className="flex items-center">
          <h1 className="font-black text-5xl">Jobyte.</h1>
          <p className="text-xl font-semibold">nterprise</p>
        </span>
      </div>
      <div className="relative w-full p-2 bg-foreground">
        <Button
          className="absolute left-1 top-1 text-background hover:text-foreground"
          variant="ghost"
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Voltar
        </Button>
        <EnterpriseRegisterForm />
      </div>
    </main>
  );
}