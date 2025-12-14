import { fetchClient } from "@/lib/fetch-client";
import { Vacancy } from "@/types/Vacancy";

export async function getVacancyDetailsByIdService(id: string): Promise<Vacancy> {
  const response = await fetchClient({
    path: `/api/enterprise/vacancy/${id}`,
    init: {
      method: "GET"
    },
    isAuth: true
  });

  return await response.json();
}