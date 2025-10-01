import { cookies } from "next/headers";

import Header from '@/components/Application/Header'
import { Home } from '@/components/Application/Home'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = async () => {
   const token =await cookies().get("access_token")?.value;
    const isLoggedIn = !!token;
  return (
    <div>
     <Header isLoggedIn={isLoggedIn} />
     <Home/>
    </div>
  )
}

export default page