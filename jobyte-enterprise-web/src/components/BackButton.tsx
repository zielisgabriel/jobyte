"use client"

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation"
import { Button } from "./ui/button";

export function BackButton() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"ghost"}
      className="mb-2"
    >
      <ArrowLeftIcon />
      Voltar
    </Button>
  );
}