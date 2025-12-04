import { apiDelay } from "@/utils/apiDelay";

interface FetchWithoutAuthProps {
  path: string,
  host?: string,
  init?: RequestInit
}

export async function fetchWithoutAuth({
  path,
  host,
  init
}: FetchWithoutAuthProps) {
  await apiDelay(500);

  const apiResponse = await fetch(`${(host ?? process.env.PUBLIC_API_URL) + path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers || {},
    }
  }).catch(() => {
    throw Error("Servidor está fora do ar!")
  });
  
  if (!apiResponse.ok) throw Error("Houve um erro inesperado!");
  
  return apiResponse;
}