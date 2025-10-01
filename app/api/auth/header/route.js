import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = cookies();
  const value = cookieStore.get("access_token")?.value;

  console.log("Cookie value:", value);

  return NextResponse.json({ access_token: value || null });
}
