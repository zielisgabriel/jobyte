import { getToken } from "next-auth/jwt";
import {NextResponse, NextRequest} from "next/server";

export interface Session {
  user?: {
    roles?: string[];
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Use getToken (edge-compatible) instead of importing NextAuth handler into middleware
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const session = token ? ({ user: { roles: (token as any).roles || [] } } as Session) : null;

  const publicPaths: string[] = [
    "/",
    "/enterprise/register",
    "/enterprise/login",
    "/candidate/register",
    "/candidate/login",
    "/auth/signin"
  ];

  if (publicPaths.some(path => pathname.startsWith(path))) return NextResponse.next();

  if (!session) {
    const url = new URL("/auth/signin", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  const roles = session.user?.roles || [];

  if (pathname.startsWith("/dashboard")) {
    if (!roles.includes("ENTERPRISE")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (pathname.startsWith("/vacancy")) {
    if (!roles.includes("CANDIDATE")) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();

}

export const config = {
  matcher: [
    // Exclude Next.js static files, images and favicon from middleware
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
}