"use server";

import { fetchClient } from "@/lib/fetch-client";
import { ProfileDetails } from "@/types/profile-details";
import { cacheLife, cacheTag } from "next/cache";

export async function getProfileDetailsService(): Promise<ProfileDetails | null> {
  "use cache: private";

  cacheTag("profileDetails");
  cacheLife("minutes");

  const response = await fetchClient({
    path: "/api/enterprise/profile/details",
    isAuth: true,
    init: {
      method: "GET"
    }
  });

  const data: ProfileDetails = await response.json();

  return data;
}