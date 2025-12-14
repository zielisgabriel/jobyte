"use client";

import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export function AuthArea() {
  return (
    <Button
      size="sm"
      onClick={async () => await signIn("keycloak", {
        redirect: true,
        redirectTo: "/dashboard"
      })}
    >
      Entrar
    </Button>
  );
}