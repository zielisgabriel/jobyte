import Link from "next/link";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";
import { getCurrentProfileSimple } from "@/utils/get-current-profile-simple";
import { ProfileSheet } from "./ProfileSheet";
import { AuthArea } from "./AuthArea";
import { auth } from "@/auth";
import { Button } from "./ui/button";

async function IncompleteProfileButton() {
  return (
    <Button asChild>
      <Link href={"/fill-profile"}>
        Complete seu perfil
      </Link>
    </Button>
  );
}

async function ProfileArea() {
  const session = await auth();
  
  const profile = await getCurrentProfileSimple();

  if (session && !profile) return <IncompleteProfileButton />

  return profile ? <ProfileSheet profile={profile} /> : <AuthArea />;
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