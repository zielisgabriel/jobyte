import { fetchWithoutAuth } from "@/utils/fetchWithoutAuth";

export async function getVacancyMetricsByIdService(id: string) {
  return await fetchWithoutAuth(`/api/metrics/vacancy/${id}`, "http://localhost:5000");
}