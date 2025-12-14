import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch(`${process.env.PUBLIC_API_URL}/api/enterprise/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json(
      { message: errorData?.message ?? "Erro ao criar perfil" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
