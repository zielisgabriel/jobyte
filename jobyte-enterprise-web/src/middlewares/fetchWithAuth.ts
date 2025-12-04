import { apiDelay } from "@/utils/apiDelay";
import { auth } from "@/auth";

export async function fetchWithAuth(path: string, init?: RequestInit) {
  const session = await auth();
  
  await apiDelay(500);

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