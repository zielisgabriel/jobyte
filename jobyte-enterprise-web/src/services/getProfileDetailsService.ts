import { fetchWithAuth } from "@/middlewares/fetchWithAuth";

export async function getProfileDetailsService() {
  return await fetchWithAuth("/api/enterprise/profile/details");
}