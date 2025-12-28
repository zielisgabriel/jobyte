"use server";

import { createVacancyService } from "@/services/create-vacancy-service";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { data, profileId } = body;
  const response = await createVacancyService({ data, profileId });

  revalidateTag("vacancies", "default");
  return response;
}