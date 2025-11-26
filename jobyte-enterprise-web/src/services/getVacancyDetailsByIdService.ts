import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getVacancyDetailsByIdService(id: string) {
  return await fetchWithAuth(`/api/enterprise/vacancy/${id}`, {
    method: "GET"
  });
}