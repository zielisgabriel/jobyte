"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Vacancy } from "@/types/Vacancy";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

export function VacancyList() {
  const [page, setPage] = useState(0);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);

  async function fetchVacancies(page: number) {
    const response = await fetch(`/api/enterprise/vacancy/list?page=${page}`);
    const data = await response.json();
    setVacancies(data);
  }

  useEffect(() => {
    fetchVacancies(page);
  }, [page]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      {vacancies.length > 0 ? (
        vacancies.map(vacancy => (
          <Card key={vacancy.id}>
            <CardHeader>
                <CardTitle className="font-bold text-2xl line-clamp-2">
                  {vacancy.title}
                </CardTitle>
                <CardDescription className="line-clamp-4">
                  {vacancy.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Link href={`/dashboard/vacancy/metrics/${vacancy.id}`} className="flex mt-auto w-full">
                <Button className="w-full">
                  Ver métricas da vaga
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center font-semibold opacity-60 mt-12">
          Nenhuma vaga encontrada
        </p>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"></div>
    </div>
  );
}
