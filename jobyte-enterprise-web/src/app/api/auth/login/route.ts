import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {email, password} = await req.json();
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
  params.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET!);
  params.append("username", email);
  params.append("password", password);

  const tokenResponse = await fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  })
  if (!tokenResponse.ok) {
    return NextResponse.json({error: await tokenResponse.json()}, {status: 401});
  }

  const {access_token, refresh_token, expires_in} = await tokenResponse.json();
  const response = NextResponse.json({message: "Login successful"}, {status: 200});
  response.cookies.set("access_token", access_token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expires_in,
    path: "/",
    sameSite: "strict",
  });
  response.cookies.set("refresh_token", refresh_token,{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "strict",
  });
  return response;
}