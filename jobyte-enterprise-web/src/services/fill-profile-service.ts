"use server";

import { FillProfileFormData } from "@/app/(utils)/fill-profile/page";
import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function fillProfileService({
  address,
  cnpj,
  companyName,
  phone
}: FillProfileFormData): Promise<any> {
  const response = await fetchClient({
    path: "/api/enterprise/profile/fill",
    isAuth: true,
    init: {
      method: "POST",
      body: JSON.stringify({
        companyName,
        address,
        cnpj,
        phone
      })
    }
  });

  revalidateTag("profileSimple", "max");
  revalidateTag("profileDetails", "max");

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  }
}