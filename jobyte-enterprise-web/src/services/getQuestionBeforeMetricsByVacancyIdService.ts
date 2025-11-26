import { fetchWithoutAuth } from "@/utils/fetchWithoutAuth";

export async function getQuestionBeforeMetricsByVacancyIdService(vacancyId: string) {
  return await fetchWithoutAuth(`/api/metrics/questions-before/${vacancyId}`, "http://localhost:5000");
}