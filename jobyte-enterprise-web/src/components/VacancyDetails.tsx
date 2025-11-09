"use client";

import { Vacancy } from "@/types/Vacancy";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export function VacancyDetails({id}: {id: string}) {
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchVacancyDetails(id: string) {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/vacancies/${id}`);
      
      if (!response.ok) {
        setError(true);
        return;
      }
      
      const data = await response.json();
      setVacancy(data);
    } catch (err) {
      console.error("Erro ao buscar vaga:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchVacancyDetails(id);
  }, [id]);

  if (error) {
    notFound();
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Vacancy Information</h1>
      <p>Details for vacancy ID: {id}</p>
      {vacancy && (
        <div>
          <h2>{vacancy.title}</h2>
          <p>{vacancy.description}</p>
        </div>
      )}
    </div>
  );
}