import { cookies } from "next/headers"

export async function getVacanciesService(page?: string) {
  const cookieStore = cookies();
  const accessTokenCookie = (await cookieStore).get("access_token")?.value;
  const refreshtokenCookie = (await cookieStore).get("refresh_token")?.value;
}