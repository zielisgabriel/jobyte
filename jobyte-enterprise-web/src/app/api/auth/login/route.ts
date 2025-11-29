import { loginService } from "@/services/loginService";
import { LoginCredentialsRequest } from "@/types/LoginCredentialsRequest";

export async function POST(req: Request) {
  const {
    email,
    password
  }: LoginCredentialsRequest = await req.json();

  return await loginService({ email, password });
}