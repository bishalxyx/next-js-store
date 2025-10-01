import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const token = request.cookies.get("access_token")?.value;
 const loggedInUserNotAcessPath=request.nextUrl.pathname==="/auth/login"||request.nextUrl.pathname==="/auth/register"||request.nextUrl.pathname==="/auth/reset-password"||request.nextUrl.pathname==="/auth/verify-email/:path*"
if(loggedInUserNotAcessPath){
    if(token){
        return NextResponse.redirect(new URL("/",request.url));
    }
}
else{
    if(!token){
        return NextResponse.redirect(new URL("/auth/login",request.url));
    }
}
}

export const config={
    matcher:[
        '/auth/:path*',

    ]
}
