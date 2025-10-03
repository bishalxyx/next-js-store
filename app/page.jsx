import { cookies } from "next/headers";

import Header from '@/components/Application/Header'
import { Home } from '@/components/Application/Home'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Footer } from "@/components/Application/Footer";

const page = async() => {
  const cookieStore = await cookies();
   const token = cookieStore.get("access_token")?.value;
    const isLoggedIn = !!token;
  return (
    <div>
     <Header isLoggedIn={isLoggedIn} />
     <Home/>
     <Footer/>
    </div>
  )
}

export default page