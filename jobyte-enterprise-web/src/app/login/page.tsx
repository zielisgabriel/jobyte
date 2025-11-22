"use client";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/useMobile";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { EnterpriseLoginForm } from "@/components/EnterpriseLoginForm";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

export default function LoginPage() {
  const {isMobile} = useMobile();
  const router = useRouter();

  return (
    <main className={twMerge(clsx("grid grid-cols-[1fr_1fr] h-screen", isMobile && "flex"))}>
      <div
        className={twMerge(clsx("flex flex-col justify-center items-center bg-background text-foreground", isMobile && "hidden"))}
        style={
          {
            "--background": "var(--color-foreground)",
            "--foreground": "var(--color-background)"
          } as CSSProperties
        }
      >
        <span className="flex items-center">
          <h1 className="font-black text-5xl">
            Jobyte.
          </h1>
          <p className="text-xl font-semibold">
            nterprise
          </p>
        </span>
      </div>
      <div
        className="relative w-full p-2 bg-background text-foreground"
        style={{
          "--background": "var(--color-background)",
          "--foreground": "var(--color-foreground)"
        } as CSSProperties}
      >
        <Button
          className="absolute left-1 top-1"
          variant={"ghost"}
          onClick={() => router.back()}
        >
          <ArrowLeft />
          Voltar
        </Button>
        
        <EnterpriseLoginForm />
      </div>
    </main>
  );
}