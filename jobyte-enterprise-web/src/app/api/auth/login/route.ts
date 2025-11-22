import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const responseApi = await fetch(`${process.env.PUBLIC_API_URL}/api/auth/enterprise/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    
    if (!responseApi.ok) {
      const errorData = await responseApi.json();
      return new Response(JSON.stringify(errorData), { status: responseApi.status });
    }
    
    const setCookies = responseApi.headers.getSetCookie();
    
    console.log("=== LOGIN ROUTE DEBUG ===");
    console.log("Cookies recebidos do backend:");
    setCookies.forEach((cookie, index) => {
      console.log(`Cookie ${index}:`, cookie);
    });
    console.log("=========================");

    const response = new NextResponse(null, {
      status: 200
    });

    setCookies.forEach(cookie => response.headers.append("Set-Cookie", cookie));

    return response;
  } catch (error: any) {
    console.error("Erro ao conectar com o servidor de autenticação:", error);
    return new Response(JSON.stringify({
      message: "Erro ao conectar com o servidor de autenticação",
      detail: error?.message
    }), {
      status: 502
    });
  }
}