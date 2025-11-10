"use client";

import { Vacancy } from "@/types/Vacancy";
import { useState, useTransition } from "react";

interface VacancyInfoProps {
  vacancyId: string;
}

export function VacancyInfo({ vacancyId }: VacancyInfoProps) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isPending, startTransition] = useTransition();

  async function fetchVacancy(id: string) {
    const response = await fetch(`/api/vacancies/${id}`);
    const data = await response.json();
    setVacancy(data);
  }

  if (isPending) {
    return <div>Loading vacancy information...</div>;
  }

  return (
    <div>
      <h1>{vacancy?.title}</h1>
      <p>{vacancy?.description}</p>
    </div>
  );
}