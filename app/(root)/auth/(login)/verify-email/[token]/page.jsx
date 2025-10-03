'use client'
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import verifiedImg from '@/public/assets/images/verified.gif'
import verifiedImg1 from '@/public/assets/images/verification-failed.gif'
import Image from 'next/image';
import Link from 'next/link';
import { WEBSITE_HOME, WEBSITE_LOGIN } from '@/routes/WebsiteRoute';
import { Button } from '@/components/ui/button';


const EmailVerification = ({ params }) => {
  const { token } = use(params);
  const [isVerify, setIsVerify] = useState(false)
  console.log(token);
  useEffect(() => {
    const verify = async () => {
      const { data: verificationResponse } = await axios.post('/api/auth/verify-email', { token })
      console.log(verificationResponse);
      if (!verificationResponse.success) {
        setIsVerify(false)
      }
    }
    verify();
  }, [token])
  return (
    <div>
      <Card className='w-[400px]'>
        <CardContent>
          {!isVerify ?
            <div>
              <div className='flex justify-center items-center'>
                <Image src={verifiedImg} alt='isVerify' height={verifiedImg.height} width={verifiedImg.width} className='h-[100px] w-auto' />
              </div>
              <div className='text-center'>
                <h1 className='text-2xl font-bold my-5 text-green-500'>Email verification success</h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div> :
            <div>
              <div className='flex justify-center items-center'>
                <Image src={verifiedImg1.src} alt='isVerify1' height={verifiedImg1.height} width={verifiedImg1.width} className='h-[100px] w-auto' />
              </div>
              <div className='text-center'>
                <h1 className='text-2xl font-bold my-5 text-red-500'>Email verification failed</h1>
      
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>

              </div>
            </div>
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default EmailVerification