import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const publicPaths = [
    "/auth/login",
    "/auth/register",
    "/auth/reset-password",
  ];

  const isVerifyEmailPath = pathname.startsWith("/auth/verify-email");

  if (publicPaths.includes(pathname) || isVerifyEmailPath) {
    if (token) {
      // If logged in, prevent going to login/register/reset
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes (require token)
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};