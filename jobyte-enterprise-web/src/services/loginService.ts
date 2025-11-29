import { LoginCredentialsRequest } from "@/types/LoginCredentialsRequest";
import { fetchWithoutAuth } from "@/utils/fetchWithoutAuth";

export async function loginService({email, password}: LoginCredentialsRequest) {
  return await fetchWithoutAuth({
    path: "/api/auth/enterprise/login",
    init: {
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    }
  });
}