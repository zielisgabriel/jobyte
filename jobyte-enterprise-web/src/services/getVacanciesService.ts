import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getVacanciesService(page?: string) {
  return await fetchWithAuth(`/api/enterprise/vacancy/list${page ? `?page=${page}` : ""}`, {
    method: "GET"
  });
}