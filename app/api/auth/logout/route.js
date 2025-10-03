import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {

  const cookieStore = await cookies();
 const value=cookieStore.get("access_token")?.value;
 console.log(value);
  
  cookieStore.set({
    name: "access_token",
    value: "",
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // expire immediately
  });

  return NextResponse.json({ message: "Logged out successfully" });
}
