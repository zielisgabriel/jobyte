export async function refreshTokenService(refreshToken: string): Promise<Response> {
  return await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/refresh-token`, {
    method: "POST",
    headers: {
      "Cookie": `refresh_token=${refreshToken}`
    }
  });
}