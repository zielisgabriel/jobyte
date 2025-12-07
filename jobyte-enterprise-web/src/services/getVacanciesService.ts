import { fetchWithAuth } from "@/middlewares/fetchWithAuth";

interface GetVacanciesServiceProps {
  page?: string
}

export async function getVacanciesService({
  page
}: GetVacanciesServiceProps) {
  return await fetchWithAuth({
    path: `/api/enterprise/vacancy/list?page=${page ?? 1}`
  });
}