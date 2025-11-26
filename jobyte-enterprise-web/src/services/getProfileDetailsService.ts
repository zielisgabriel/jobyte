import { fetchWithAuth } from "@/utils/fetchWithAuth";

export async function getProfileDetailsService() {
  return await fetchWithAuth("/api/enterprise/profile/me");
}