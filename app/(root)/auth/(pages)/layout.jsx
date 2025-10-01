import Header from "@/components/Application/Header";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const token =await cookies().get("access_token")?.value;
  const isLoggedIn = !!token;

  return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        {children}
      </>
  );
}
