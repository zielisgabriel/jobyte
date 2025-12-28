import { NextRequest, NextResponse } from "next/server";

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}

export async function apiProxy(req: NextRequest, apiPath: string): Promise<Response> {
  const cookies = req.cookies;
  let accessToken = cookies.get("access_token")?.value;
  const refreshTokenCookie = cookies.get("refresh_token")?.value;

  // Buffer do body para reutilizar no retry
  let bufferedBody: string | undefined = undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    try {
      bufferedBody = await req.text();
    } catch (e) {
      console.error("BFF: Falha ao ler o corpo da requisição:", e);
    }
  }

  const apiResponse = await fetch(`${process.env.PUBLIC_API_URL}/${apiPath}`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: bufferedBody,
  });

  if (apiResponse.status === 401 && refreshTokenCookie) {
    try {
      const tokenData = await refreshToken(refreshTokenCookie);
      
      if (!tokenData) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      const retryResponse = await fetch(`${process.env.PUBLIC_API_URL}/${apiPath}`, {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenData.access_token}`
        },
        body: bufferedBody,
      });

      let response: NextResponse;
      const contentType = retryResponse.headers.get("Content-Type") || "";
      
      if (contentType.includes("application/json")) {
        const data = await retryResponse.json();
        response = NextResponse.json(data, { status: retryResponse.status });
      } else {
        const text = await retryResponse.text();
        response = new NextResponse(text, {
          status: retryResponse.status,
          headers: { "Content-Type": contentType || "text/plain" }
        });
      }
      
      response.cookies.set("access_token", tokenData.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: tokenData.expires_in,
      });

      response.cookies.set("refresh_token", tokenData.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: tokenData.refresh_expires_in,
      });

      return response;
    } catch (error: any) {
      console.error("BFF: Erro ao atualizar token:", error);
      return NextResponse.json({ message: "Token refresh failed" }, { status: 401 });
    }
  }

  try {
    const data = await apiResponse.json();
    return NextResponse.json(data, { status: apiResponse.status });
  } catch (_) {
    const text = await apiResponse.text();
    return new NextResponse(text, {
      status: apiResponse.status,
      headers: { "Content-Type": apiResponse.headers.get("Content-Type") || "text/plain" }
    });
  }
}

async function refreshToken(refreshToken: string): Promise<RefreshTokenResponse | null> {
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
  params.append("refresh_token", refreshToken);

  try {
    const response = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params
    });

    if (!response.ok) {
      console.error("BFF: Falha ao atualizar token:", await response.text());
      return null;
    }

    const tokenData: RefreshTokenResponse = await response.json();
    
    return tokenData;
  } catch (error: any) {
    console.error("BFF: Erro ao atualizar token:", error);
    return null;
  }
}