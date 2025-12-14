"use server";

import { FillProfileFormData } from "@/app/(utils)/fill-profile/page";
import { fetchWithAuth } from "@/middlewares/fetchWithAuth";
import { revalidateTag } from "next/cache";

export async function fillProfileService({
  address,
  cnpj,
  companyName,
  phone
}: FillProfileFormData) {
  const response = await fetchWithAuth({
    path: "/api/enterprise/profile/fill",
    init: {
      method: "POST",
      body: JSON.stringify({
        companyName,
        address,
        cnpj,
        phone
      })
    }
  }).catch(err => {
    throw new Error(err);
  });

  revalidateTag("profileSimple", "max");
  revalidateTag("profileDetails", "max");

  return {
    ok: response.ok,
    status: response.status,
    statusText: response.statusText
  }
}