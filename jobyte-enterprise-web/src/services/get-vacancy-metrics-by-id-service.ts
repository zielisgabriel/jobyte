"use server";

import { fetchClient } from "@/lib/fetch-client";
import { VacancyMetrics } from "@/types/vacancy-metrics";

export async function getVacancyMetricsByIdService(vacancyId: string): Promise<VacancyMetrics> {
  const response = await fetchClient({
    path: `/api/metrics/vacancy/${vacancyId}`,
    host: process.env.PUBLIC_API_METRICS_URL,
    init: {
      method: "GET"
    },
    isAuth: false
  });

  return await response.json();
}