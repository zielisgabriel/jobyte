import { NextRequest, NextResponse } from "next/server";
import { AUTH_PATHS } from "./environments/AUTH_PATHS";
import { PRIVATE_PATHS } from "./environments/PRIVATE_PATHS";

export default function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;
  
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const isPrivatePath = PRIVATE_PATHS.some(path => pathname.endsWith(path))
  if (isPrivatePath && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAuthPath = AUTH_PATHS.some(path => pathname.startsWith(path));
  if (isAuthPath && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ],
};