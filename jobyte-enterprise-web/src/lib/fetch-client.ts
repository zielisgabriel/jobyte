"use server";

import { auth } from "@/auth"
import { ForbiddenError } from "@/errors/forbidden-error";
import { HttpError } from "@/errors/http-error";
import { NotFoundError } from "@/errors/not-found-error";
import { UnauthorizedError } from "@/errors/unauthorized-error";

interface FetchClientProps {
  path: string,
  isAuth: boolean,
  init: RequestInit
}

export async function fetchClient({
  path,
  isAuth,
  init
}: FetchClientProps) {
  const session = isAuth ? await auth() : null;

  const authHeader: HeadersInit | undefined = isAuth ? { "Authorization": `Bearer ${session?.accessToken}`} : undefined;

  const response = await fetch(`${process.env.PUBLIC_API_URL + path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...authHeader
    }
  });

  if (response.ok) {
    return response;
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {}

  switch (response.status) {
    case 401:
      throw new UnauthorizedError(body);
    case 403:
      throw new ForbiddenError(body);
    case 404:
      throw new NotFoundError(body);
    default:
      throw new HttpError(response.status, body);
  }
}