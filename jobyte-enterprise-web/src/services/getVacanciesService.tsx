import { cookies } from "next/headers";
import { refreshTokenService } from "./refreshTokenService";

export async function getVacanciesService(page?: string) {
  const cookieStore = cookies();
  const accessTokenCookie = (await cookieStore).get("access_token")?.value;
  const refreshtokenCookie = (await cookieStore).get("refresh_token")?.value;

  const response = await fetch(`${process.env.PUBLIC_API_URL}/api/enterprise/vacancy/list${page ? `?page=${page}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessTokenCookie ? { "Authorization": `Bearer ${accessTokenCookie}` } : {})
    },
  });

  if (response.status === 401 && refreshtokenCookie) {
    const refreshTokenResponse = await refreshTokenService(refreshtokenCookie);
    if (!refreshTokenResponse.ok) {
      throw new Error("Unauthorized");
    }

    const setCookiesRefreshTokenResponse = refreshTokenResponse.headers.getSetCookie();
    const newAccessToken = extractCookieValue(setCookiesRefreshTokenResponse, "access_token");
    if (!newAccessToken) {
      throw new Error("Unauthorized");
    }

    const retryResponse = await fetch(`${process.env.PUBLIC_API_URL}/api/enterprise/vacancy/list${page ? `?page=${page}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${newAccessToken}`
      }
    });
    return retryResponse;
  }

  return response;
}

function extractCookieValue(cookies: string[] | null, cookieName: string): string {
  if (!cookies) return "";
  const found = cookies.find((c) => c.startsWith(cookieName + "="));
  if (!found) return "";
  return found.split(";")[0].split("=")[1];
}