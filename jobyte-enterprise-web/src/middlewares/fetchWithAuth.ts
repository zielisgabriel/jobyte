import { auth } from "@/auth";

interface FetchWithAuthProps {
  path: string,
  init?: RequestInit
  tags?: string[]
}

export async function fetchWithAuth({ path, init }: FetchWithAuthProps) {
  const session = await auth();

  if (!session?.accessToken) {
    throw Error("Usuário não autenticado");
  }

  const apiResponse = await fetch(`${process.env.PUBLIC_API_URL + path}`, {
    ...init,
    headers: {
      ...init?.headers || {},
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`
    }
  }).catch(() => {
    throw Error("Servidor fora do ar!");
  });

  return apiResponse;
}