"use server";

import { fetchClient } from "@/lib/fetch-client";
import { ProfileSimple } from "@/types/profile-simple";

export async function getProfileSimpleService(): Promise<ProfileSimple | null> {
  const response = await fetchClient({
    path: "/api/enterprise/profile/simple",
    isAuth: true,
    init: {
      method: "GET"
    }
  });

  return response.json();
}