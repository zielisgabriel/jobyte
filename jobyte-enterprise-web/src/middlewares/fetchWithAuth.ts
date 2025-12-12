import { auth, signOut } from "@/auth";
import { signIn } from "next-auth/react";

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

  if (session.error === "RefreshAccessTokenError") {
    await signOut();
    await signIn("keycloak");
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

  if (!apiResponse.ok) {
    throw new Error(`Error on fetch: ${apiResponse.status}`);
  }

  return apiResponse;
}