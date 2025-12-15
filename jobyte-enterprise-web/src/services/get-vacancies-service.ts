"use server";

import { fetchClient } from "@/lib/fetch-client";
import { VacanciesResponse } from "@/types/vacancies-response";

interface GetVacanciesServiceProps {
  page?: string
}

export async function getVacanciesService({
  page
}: GetVacanciesServiceProps): Promise<VacanciesResponse> {
  const response = await fetchClient({
    path: `/api/enterprise/vacancy/list?page=${page ?? 1}`,
    isAuth: true,
    init: {
      method: "GET"
    }
  })

  return await response.json();
}