import Link from "next/link";
import { Button } from "./ui/button";
import { Vacancy } from "@/types/Vacancy";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { getVacanciesService } from "@/services/getVacanciesService";
import clsx from "clsx";
import dayjs from "dayjs";

interface VacancyListProps {
  page?: string
}

async function getVacancies(page?: string): Promise<Vacancy[]> {
  const response = await getVacanciesService(page);
  console.log(response);
  const vacancies: Vacancy[] = await response.json();
  return vacancies;
}

export async function VacancyList({ page }: VacancyListProps) {
  const vacancies = await getVacancies(page);

  return (
    <>
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
            <CardFooter className="mt-auto flex flex-col">
              <div className="flex justify-between items-end mb-5 w-full">
                <span className="flex gap-2 items-center font-semibold text-sm">
                  Status

                  <div className={clsx("w-3 h-2 block rounded-full", (
                    vacancy.status === "OPEN" && "bg-green-400"
                  ))} />
                </span>

                <p className="flex gap-1 text-[13px] text-muted-foreground">
                  Criado à
                  <span className="">
                    {dayjs(vacancy.createdAt).format("DD/MM/YYYY")}
                  </span>
                </p>
              </div>
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
    </>
  );
}
