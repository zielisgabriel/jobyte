"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";

export function BackNavButton() {
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