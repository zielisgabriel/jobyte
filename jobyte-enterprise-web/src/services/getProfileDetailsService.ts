import { fetchWithAuth } from "@/middlewares/fetchWithAuth";
import { ProfileDetails } from "@/types/ProfileDetails";
import { cacheLife, cacheTag } from "next/cache";

export async function getProfileDetailsService(): Promise<ProfileDetails> {
  "use cache: private";

  cacheTag("profileDetails");
  cacheLife("minutes");

  const response = await fetchWithAuth({
    path: "/api/enterprise/profile/details"
  });

  const data: ProfileDetails = await response.json();

  return data;
}