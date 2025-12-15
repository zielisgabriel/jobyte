"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function SignInButton() {
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