import { Footer } from "@/components/Application/Footer";
import Header from "@/components/Application/Header";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const isLoggedIn = !!token;

  return (
      <>
        <Header isLoggedIn={isLoggedIn} />
        {children}
        <Footer/>
      </>
  );
}
