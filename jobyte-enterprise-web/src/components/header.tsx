import Link from "next/link";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { ProfileSheet } from "./profile-sheet";
import { auth, signIn } from "@/auth";
import { getProfileSimpleService } from "@/services/get-profile-simple-service";
import { UnauthorizedError } from "@/errors/unauthorized-error";
import { NotFoundError } from "@/errors/not-found-error";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <Button
      size="sm"
      onClick={async () => await signIn("keycloak", {
        redirectTo: "/dashboard"
      })}
    >
      Entrar
    </Button>
  );
}

async function ProfileArea() {

  try {
    const session = await auth();

    if (!session) return <SignIn />

    const profile = await getProfileSimpleService();

    if (profile) return <ProfileSheet profile={profile} />
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      await signIn("keycloak");
    }

    if (error instanceof NotFoundError) {
      redirect("/fill-profile");
    }

    throw error;
  }
}

export async function Header() {

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
            <div>
              <Skeleton className="w-40 h-10 rounded-lg" />
            </div>
          }
        >
          <ProfileArea />
        </Suspense>
      </main>
    </header>
  );
}