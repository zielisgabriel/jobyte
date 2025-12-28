"use server";

import { CreateVacancyFormData } from "@/components/create-vacancy-form";
import { fetchClient } from "@/lib/fetch-client";

interface CreateVacancyServiceProps {
  data: CreateVacancyFormData,
  profileId: string
}

export async function createVacancyService({data, profileId}: CreateVacancyServiceProps): Promise<Response> {
  const response = await fetchClient({
    path: "/api/enterprise/vacancy/create",
    init: {
      body: JSON.stringify({
        ...data,
        enterpriseId: profileId,
      }),
      method: "POST"
    },
    isAuth: true
  });

  return response;
}