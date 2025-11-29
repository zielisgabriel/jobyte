import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PRIVATE_PATHS } from "./environments/PRIVATE_PATHS";
import { AUTH_PATHS } from "./environments/AUTH_PATHS";

function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  return Boolean(accessToken || refreshToken);
}

function matchesPath(pathname: string, paths: string[]): boolean {
  return paths.some((path) => {
    if (pathname === path) return true;
    if (pathname.startsWith(`${path}/`)) return true;
    return false;
  });
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) return NextResponse.next();

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  const authenticated = isAuthenticated(request);

  if (matchesPath(pathname, PRIVATE_PATHS) && !authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (matchesPath(pathname, AUTH_PATHS) && authenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Static assets with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};