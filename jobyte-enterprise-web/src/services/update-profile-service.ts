"use server";

import { ProfileEditFormData as UpdateProfileRequest } from "@/components/profile-edit-form";
import { fetchWithAuth } from "@/middlewares/fetch-with-auth";
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