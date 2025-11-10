"use client"

import { VacanciesResponse } from "@/types/VacanciesResponse";
import { Vacancy } from "@/types/Vacancy";
import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useMobile } from "@/hooks/useMobile";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export function VacancyTab() {
  const [vacancies, setVacancies] = useState<VacanciesResponse | null>(null);
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const {isMobile} = useMobile();
  const params = useSearchParams();
  const page = params.get("page") || undefined;

  function normalizeList(list: Vacancy[]): Vacancy[] {
    return list.map((v: Vacancy) => {
      if (!v.enterprise) {
        const companyName = v.company || "Empresa";
        v.enterprise = {
          id: "mock-enterprise",
          companyName,
          cnpj: "",
          address: "",
          phone: "",
          createdAt: new Date().toISOString(),
        };
      }
      return v;
    });
  }

  async function fetchVacancies() {
    try {
      const response = await fetch(`/api/vacancies/list${page ? `?page=${page}` : ""}`);
      if (!response.ok) {
        console.warn("API de vagas retornou", response.status, "- usando mocks");
        setVacancies({ vacancies: normalizeList([]), total: 0 });
        return;
      }
      const data: VacanciesResponse = await response.json();
      data.vacancies = normalizeList(data.vacancies);
      setVacancies(data);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
      setVacancies({ vacancies: normalizeList([]), total: 0 });
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, [page]);

  if (!vacancies) {
    return <div>Carregando vagas...</div>;
  }

  return (
    <div className={twMerge(clsx(
      "grid gap-4 py-4",
      "grid-cols-1 md:grid-cols-2"
    ))}>
      <ScrollArea.Root
        className={twMerge(clsx(
          "w-full rounded-xl border overflow-hidden",
          "h-[60vh] md:h-[70vh]",
          "order-2 md:order-1"
        ))}
      >
        <ScrollArea.Viewport className="w-full h-full">
          <ul className="w-full">
            {vacancies?.vacancies.map((vacancy) => {
              const enterpriseName = vacancy.enterprise?.companyName || vacancy.company || "Empresa";
              return (
                <li
                  key={vacancy.id}
                  className="border-b cursor-pointer"
                >
                  <Button
                    onClick={() => setSelectedVacancy(vacancy)}
                    className="flex-col h-20 w-full items-start justify-center rounded-none p-2"
                    variant={selectedVacancy?.id === vacancy.id ? "default" : "ghost"}
                  >
                    <h3 className="text-lg font-semibold">{vacancy.title}</h3>
                    <p className="text-[12px] opacity-70 text-left">
                      {enterpriseName} - {vacancy.location || "Local não informado"}
                    </p>
                  </Button>
                </li>
              )
            })}
          </ul>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-black/10"
        >
          <ScrollArea.Thumb className="flex-1 bg-black/30 rounded" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
      
      <div
        className={twMerge(clsx(
          "border w-full rounded-xl p-4 overflow-hidden",
          "h-[30vh] md:h-[70vh]",
          "order-1 md:order-2"
        ))}
      >
        {selectedVacancy ? (
            <div className="h-full flex flex-col">
              <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full">
                  <div className="pr-4">
                    <h1 className="text-2xl font-bold">
                    {selectedVacancy.title}
                    </h1>
                    <h2 className="text-xl">
                    {(selectedVacancy.enterprise?.companyName || selectedVacancy.company || "Empresa")} - {selectedVacancy.location || "Local não informado"}
                    </h2>
                    <p className="mt-4">
                    {selectedVacancy.description}
                    </p>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  orientation="vertical"
                  className="flex select-none touch-none p-0.5 bg-transparent transition-colors duration-[160ms] ease-out hover:bg-black/10"
                  >
                  <ScrollArea.Thumb className="flex-1 bg-black/30 rounded" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
              <Link
                href={`/vacancy/${selectedVacancy.id}`}
              >
                <Button className="w-full mt-4">
                  Candidatar-se
                </Button>
              </Link>
            </div>
        ) : (
          <p className="font-bold text-center">
            Selecione uma vaga para ver os detalhes.
            <span className="font-semibold text-sm opacity-60">
              <br />
              Clique em uma vaga para ver mais informações.
            </span>
          </p>
        )}
      </div>
    </div>
  );
}