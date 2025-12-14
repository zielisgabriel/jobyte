"use server";

import { ProfileEditFormData as UpdateProfileRequest } from "@/components/ProfileEditForm";
import { fetchWithAuth } from "@/middlewares/fetchWithAuth";
import { revalidateTag } from "next/cache";

export async function updateProfileService(data: UpdateProfileRequest) {
  const { companyName, address, phone } = data;

  const response = await fetchWithAuth({
    path: "/api/enterprise/profile/update-details",
    init: {
      method: "PUT",
      body: JSON.stringify({
        companyName,
        address,
        phone
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
  });

  revalidateTag("profileDetails", "max");

  return response;
}