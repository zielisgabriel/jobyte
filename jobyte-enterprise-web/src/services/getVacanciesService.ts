import { cookies } from "next/headers";
import { refreshTokenService } from "./refreshTokenService";

export async function getVacanciesService(page?: string) {
  const cookiesStore = cookies();
  const accessTokenCookie = (await cookiesStore).get("access_token")?.value;
  const refreshTokenCookie = (await cookiesStore).get("refresh_token")?.value;

  const url = `${process.env.PUBLIC_API_URL}/api/enterprise/vacancy/list${page ? `?page=${page}` : ""}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": accessTokenCookie ? `Bearer ${accessTokenCookie}` : ""
    }
  });

  if (response.status === 401 && refreshTokenCookie) {
    console.log("BFF: Access token expirado, tentando renovar...");

    const refreshTokenResponse = await refreshTokenService(refreshTokenCookie);
    if (!refreshTokenResponse.ok) {
      throw new Error("Unauthorized");
    }

    const setCookiesRefreshTokenResponse = refreshTokenResponse.headers.getSetCookie();
    const newAccessToken = extractCookieValue(setCookiesRefreshTokenResponse, "access_token");
    if (!newAccessToken) {
      throw new Error("Unauthorized");
    }

    const retryResponse = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${newAccessToken}`
      }
    });
    return retryResponse;
  }

  if (response.status === 401) {
    // No refresh token available or refresh not attempted
    throw new Error("Unauthorized");
  }

  return response; // Always return the initial successful response
}

function extractCookieValue(cookies: string[], cookieName: string): string {
  const found = cookies.find((c) => c.startsWith(cookieName + "="));
  if (!found) return "";
  return found.split(";")[0].split("=")[1];
}