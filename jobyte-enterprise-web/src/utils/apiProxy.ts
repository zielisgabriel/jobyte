import { NextRequest, NextResponse } from "next/server";

export async function apiProxy(req: NextRequest, apiPath: string) {
  if (req.url.includes("/api/public")) {
    return await fetchApi(req, apiPath);
  }

  const cookies = req.cookies;
  const accessTokenCookie = cookies.get("access_token")?.value;
  const refreshTokenCookie = cookies.get("refresh_token")?.value;

  const responseApi = await fetchApi(req, apiPath, accessTokenCookie);

  if (responseApi.status === 401 && refreshTokenCookie) {
    const refreshResponse = await refreshToken(refreshTokenCookie);
    
    if (!refreshResponse.ok) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const setCookies = refreshResponse.headers.getSetCookie?.() || [];
    const newAccessToken = extractCookieValue(setCookies, "access_token");
    
    if (!newAccessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const retryResponse = await fetchApi(req, apiPath, newAccessToken);
    const retryData = await retryResponse.json().catch(() => ({}));
    
    const finalResponse = NextResponse.json(retryData, { status: retryResponse.status });
    
    for (const cookie of setCookies) {
      finalResponse.headers.append("Set-Cookie", cookie);
    }
    
    return finalResponse;
  }

  const data = await responseApi.json().catch(() => ({}));
  return NextResponse.json(data, { status: responseApi.status });
}

async function fetchApi(req: NextRequest, apiPath: string, accessToken?: string) {
  const response = await fetch(`${process.env.PUBLIC_API_URL}/${apiPath}`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
    },
    body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
  });
  return response;
}

async function refreshToken(refreshToken: string) {
  const headers = new Headers();
  headers.append("Cookie", `refresh_token=${refreshToken}`);

  return await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/refresh-token`, {
    method: "POST",
    headers: headers,
  });
}

function extractCookieValue(cookies: string[] | null, cookieName: string): string {
  if (!cookies) return "";
  const found = cookies.find((c) => c.startsWith(cookieName + "="));
  if (!found) return "";
  return found.split(";")[0].split("=")[1];
}