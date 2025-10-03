import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;

  // Pages that should be accessible without login
  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
  ];

  const pathname = request.nextUrl.pathname;

  const isPublicPath =
    publicPaths.includes(pathname) || pathname.startsWith("/auth/verify-email");

  if (isPublicPath) {
    if (token) {
      // If already logged in, block going to login/register
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /auth routes
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
