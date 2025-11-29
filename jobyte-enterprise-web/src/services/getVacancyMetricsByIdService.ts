import { fetchWithoutAuth } from "@/utils/fetchWithoutAuth";

export async function getVacancyMetricsByIdService(id: string) {
  return await fetchWithoutAuth({
    path: `/api/metrics/vacancy/${id}`,
    host: "http://localhost:5000"
  });
}