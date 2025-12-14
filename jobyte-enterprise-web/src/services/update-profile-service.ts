"use server";

import { ProfileEditFormData as UpdateProfileRequest } from "@/components/profile-edit-form";
import { fetchClient } from "@/lib/fetch-client";
import { revalidateTag } from "next/cache";

export async function updateProfileService(data: UpdateProfileRequest) {
  const { companyName, address, phone } = data;

  const response = await fetchClient({
    path: "/api/enterprise/profile/update-details",
    init: {
      method: "PUT",
      body: JSON.stringify({
        companyName,
        address,
        phone
      })
    },
    isAuth: true
  })

  revalidateTag("profileDetails", "max");

  return response;
}