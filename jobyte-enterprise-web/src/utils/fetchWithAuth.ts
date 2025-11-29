import { apiDelay } from "@/mock/apiDelay";
import { cookies } from "next/headers";

export async function fetchWithAuth(path: string, init?: RequestInit) {
  const cookieStore = cookies();
  const accessTokenCookieValue = (await cookieStore).get("access_token")?.value;
  const refreshTokenCookieValue = (await cookieStore).get("refresh_token")?.value;
  
  await apiDelay(500);

  const apiResponse = await fetch(`${process.env.PUBLIC_API_URL + path}`, {
    ...init,
    headers: {
      ...init?.headers || {},
      "Content-Type": "application/json",
      ...(accessTokenCookieValue ? { Authorization: `Bearer ${accessTokenCookieValue}` } : {})
    }
  }).catch(() => {
    throw Error("Servidor fora do ar!");
  });

  if (apiResponse.status !== 401) return apiResponse;
  if (!refreshTokenCookieValue) throw Error("Refresh Token undefined");

  const refreshTokenResponse = await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/refresh-token`, {
    method: "POST",
    headers: {
      Cookie: `refresh_token=${refreshTokenCookieValue}`
    }
  });

  if (!refreshTokenResponse.ok) throw Error("Não foi possível fazer o refresh token, status: " + refreshTokenResponse.status.toString());

  const setCookies = refreshTokenResponse.headers.getSetCookie();
  const newAccessToken = extractCookieValue(setCookies, "access_token");

  return await fetch(`${process.env.PUBLIC_API_URL + path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${newAccessToken}`
    }
  })
}

function extractCookieValue(cookies: string[] | null, cookieName: string): string {
  if (!cookies) return "";
  const found = cookies.find(c => c.startsWith(cookieName + "="));
  if (!found) return "";
  return found.split(";")[0].split("=")[1];
}