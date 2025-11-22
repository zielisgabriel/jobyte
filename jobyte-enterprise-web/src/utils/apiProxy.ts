import { NextRequest, NextResponse } from "next/server";

export async function apiProxy(req: NextRequest, apiPath: string): Promise<Response> {
  const cookies = req.cookies;

  const accessTokenCookie = cookies.get("access_token")?.value;
  const refreshTokenCookie = cookies.get("refresh_token")?.value;

  if (!refreshTokenCookie) {
    return NextResponse.json({ message: "Refresh Token undefined" }, { status: 401 });
  }

  if (req.url.includes("/api/public")) {
    return await fetchApi(req, apiPath);
  }

  const response = await fetchApi(req, apiPath, accessTokenCookie!);

  if (response.status !== 401) {
    return response;
  }
  
  const refreshTokenResponse = await refreshToken(refreshTokenCookie);
  
  if (!refreshTokenResponse.ok) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const setCookiesRefreshTokenResponse = refreshTokenResponse.headers.getSetCookie();

  const newAccessToken = extractCookieValue(setCookiesRefreshTokenResponse, "access_token");
  
  if (!newAccessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  
  const retryResponse = await fetchApi(req, apiPath, newAccessToken);
  const finalResponse = NextResponse.json(await retryResponse.json(), {
    status: retryResponse.status
  });

  setCookiesRefreshTokenResponse.forEach(cookie => (
    finalResponse.headers.append("Set-Cookie", cookie)
  ));

  return finalResponse;
}

async function fetchApi(req: NextRequest, apiPath: string, accessToken?: string) {
  if (!accessToken) {
    let body = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await req.text();
    }
    
    const response = await fetch(`${process.env.PUBLIC_API_URL}/${apiPath}`, {
      body: body,
      method: req.method
    });
    return response;
  }
  
  const headers = new Headers(req.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);

  const cookieHeader = req.headers.get("cookie");
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }
  
  let body = null;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = await req.text();
  }
  
  const response = await fetch(`${process.env.PUBLIC_API_URL}/${apiPath}`, {
    body: body,
    method: req.method,
    headers: headers
  });
  return response;
}

async function refreshToken(refreshToken: string) {
  return await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/refresh-token`, {
    method: "POST",
    headers: {
      "Cookie": `refresh_token=${refreshToken}`
    }
  });
}

function extractCookieValue(cookies: string[], cookieName: string): string {
  const found = cookies.find((c) => c.startsWith(cookieName + "="));
  if (!found) return "";
  return found.split(";")[0].split("=")[1];
}