"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function AuthArea() {
  return (
    <div className="flex items-center gap-2">
      <Link href="/register">
        <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
          Cadastrar
        </Button>
      </Link>

      <Button
        size="sm"
        onClick={async () => await signIn("keycloak")}
      >
        Entrar
      </Button>
    </div>
  );
}