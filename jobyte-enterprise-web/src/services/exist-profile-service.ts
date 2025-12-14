import { fetchWithAuth } from "@/middlewares/fetchWithAuth";

export async function existProfileService(): Promise<boolean> {
  const response = await fetchWithAuth({
    path: "/api/enterprise/profile/exist",
    init: {
      method: "GET"
    }
  });
  const data = await response.json();

  return data;
}