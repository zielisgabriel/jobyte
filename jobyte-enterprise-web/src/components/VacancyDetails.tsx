"use client";

import { Vacancy } from "@/types/Vacancy";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface VacancyDetailsProps {
  id: string;
}

export function VacancyDetails({ id }: VacancyDetailsProps) {
  const [vacancyDetails, setVacancyDetails] = useState<Vacancy | null>(null);
  const router = useRouter();

  async function fetchVacancyDetailsById(id: string) {
    const response = await fetch(`/api/enterprise/vacancy/${id}`);
    const data = await response.json();
    setVacancyDetails(data);
  }

  useEffect(() => {
    fetchVacancyDetailsById(id);
  }, [id]);

  return (
    <div className="mb-2 space-y-2">
      <Button
        onClick={() => router.back()}
      >
        <ArrowLeftIcon />
        Voltar
      </Button>

      <h1 className="font-bold text-3xl">
        {vacancyDetails?.title}
      </h1>

      <h2 className="opacity-60">
        {vacancyDetails?.enterprise?.companyName}
      </h2>

      <Card>
        <CardHeader>
          <CardTitle>Descrição da Vaga</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-60">
            {vacancyDetails?.description}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}