"use server";

import { fetchClient } from "@/lib/fetch-client";
import { QuestionBeforeMetrics } from "@/types/QuestionBeforeMetrics";

export async function getQuestionBeforeMetricsByVacancyIdService(vacancyId: string): Promise<QuestionBeforeMetrics> {
  const response = await fetchClient({
    path: `/api/metrics/questions-before/${vacancyId}`,
    host: process.env.PUBLIC_API_METRICS_URL,
    init: {
      method: "GET"
    },
    isAuth: false
  });

  return await response.json();
}