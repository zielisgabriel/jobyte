import { fetchWithAuth } from "@/middlewares/fetchWithAuth";

export async function getVacancyDetailsByIdService(id: string) {
  return await fetchWithAuth(`/api/enterprise/vacancy/${id}`, {
    method: "GET"
  });
}