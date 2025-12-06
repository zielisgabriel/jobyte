import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function apiProxy(req: NextRequest, apiPath: string) {
  if (req.url.includes("/api/public")) {
    return await fetchApi(req, apiPath);
  }

  const session = await auth();
  const accessToken = session?.accessToken;

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const responseApi = await fetchApi(req, apiPath, accessToken);

  const data = await responseApi.json().catch(() => ({}));
  return NextResponse.json(data, { status: responseApi.status });
}

async function fetchApi(req: NextRequest, apiPath: string, accessToken?: string) {
  const response = await fetch(`${process.env.PUBLIC_API_URL + apiPath}`, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {})
    },
    body: req.method !== "GET" && req.method !== "HEAD" ? await req.text() : undefined,
  });
  return response;
}