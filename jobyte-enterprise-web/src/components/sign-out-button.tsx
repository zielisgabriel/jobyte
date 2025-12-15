"use client";

import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <Button
      size={"sm"}
      variant={"destructive"}
      onClick={async() => await signOut({ redirectTo: "/home" })}
    >
      <LogOutIcon />
      Sair da conta
    </Button>
  );
}