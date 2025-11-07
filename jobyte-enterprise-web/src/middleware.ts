import { NextRequest, NextResponse } from "next/server";
import { AUTH_PATHS } from "./environments/AUTH_PATHS";
import { PRIVATE_PATHS } from "./environments/PRIVATE_PATHS";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const accessToken = req.cookies.get("access_token")?.value;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (PRIVATE_PATHS.some(path => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (AUTH_PATHS.some(path => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};