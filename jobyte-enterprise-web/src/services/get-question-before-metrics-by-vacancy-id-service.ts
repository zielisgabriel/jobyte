import { fetchWithoutAuth } from "@/middlewares/fetchWithoutAuth";

export async function getQuestionBeforeMetricsByVacancyIdService(vacancyId: string) {
  return await fetchWithoutAuth({
    path: `/api/metrics/questions-before/${vacancyId}`,
    host: "http://localhost:5000"
  });
}