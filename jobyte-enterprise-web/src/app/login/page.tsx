import { EnterpriseLoginForm } from "@/components/EnterpriseLoginForm";
import { CSSProperties } from "react";
import { BackNavButton } from "@/components/BackNavButton";

export default async function LoginPage() {
  return (
    <main className={"md:grid md:grid-cols-[1fr_1fr] flex h-screen"}>
      <div
        className={"md:flex flex-col justify-center items-center hidden"}
        style={{
          "--background": "var(--color-foreground)",
          "--foreground": "var(--color-background)"
        } as CSSProperties }
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
        } as CSSProperties }
      >
        <BackNavButton
          route="/home"
        />
        
        <EnterpriseLoginForm />
      </div>
    </main>
  );
}