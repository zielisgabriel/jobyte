"use client";

import { Vacancy } from "@/types/Vacancy";
import { Separator } from "radix-ui";
import { useEffect, useState, useTransition, useCallback } from "react";
import { QuestionBeforeForm } from "./QuestionBeforeForm";
import { Building2Icon } from "lucide-react";
import dayjs from "dayjs";
import { ScrollArea } from "./ui/scroll-area";

interface VacancyInfoProps {
  vacancyId: string;
}

export function VacancyInfo({ vacancyId }: VacancyInfoProps) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchVacancy = useCallback(async (id: string) => {
    try {
      const controller = new AbortController();
      const response = await fetch(`/api/candidate/vacancy/${id}`, {
        signal: controller.signal,
        cache: "no-store"
      });
      if (!response.ok) {
        console.error("Falha ao buscar vaga:", response.status, response.statusText);
        return;
      }
      const data = await response.json();
      startTransition(() => setVacancy(data));
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      console.error("Erro inesperado ao buscar vaga", e);
    }
  }, [startTransition]);
  useEffect(() => {
    if (vacancyId) {
      fetchVacancy(vacancyId);
    }
  }, [vacancyId, fetchVacancy]);

  if (isPending && !vacancy) {
    return <div>Carregando informações da vaga...</div>;
  }

  return (
    <main className="md:grid md:grid-cols-[1fr_400px] flex flex-col max-w-5xl mx-auto h-full gap-4">
      <div className="space-y-3 mb-30">
        <h1 className="text-3xl font-bold">
          {vacancy?.title}
        </h1>
        <div className="flex justify-between items-center">
          <h2 className="flex items-center gap-1 font-semibold text-xl">
            <Building2Icon />
            {vacancy?.enterprise?.companyName}
          </h2>

          <p className="text-sm opacity-60 font-semibold">
            Ultima atualização: {dayjs(vacancy?.updatedAt).format("DD/MM/YYYY hh:mm")}
          </p>
        </div>
        <Separator.Root className="h-px bg-foreground" />
        <ScrollArea className="h-100">
          {vacancy?.description}
        </ScrollArea>
      </div>

      <div className="flex flex-1 flex-col gap-2 border border-foreground p-2 rounded-lg">
        <h1 className="text-lg font-bold">
          Pré-candidatura
        </h1>

        <Separator.Root className="h-px bg-foreground" />

        <QuestionBeforeForm vacancyId={vacancyId} />
      </div>
    </main>
  );
}