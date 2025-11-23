"use client";

import { CreateVacancyForm } from "@/components/CreateVacancyForm";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "radix-ui";

export default function CreateVacancyPage() {
  const router = useRouter();

  return (
    <main>
      <div className="mt-12 w-xl mx-auto">
        <Button className="mb-5" onClick={() => router.back()}>
          <ArrowLeftIcon size={16} />
          Voltar
        </Button>
        <h1 className="font-bold text-3xl">Criar nova vaga</h1>
        <Separator.Root className="my-4 bg-foreground w-full h-px" />
        <CreateVacancyForm />
      </div>
    </main>
  );
}