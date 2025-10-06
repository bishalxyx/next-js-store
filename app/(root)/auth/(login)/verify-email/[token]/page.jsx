'use client'

import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import verifiedImg from '@/public/assets/images/verified.gif';
import failedImg from '@/public/assets/images/verification-failed.gif';
import Image from 'next/image';
import Link from 'next/link';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';
import { Button } from '@/components/ui/button';

const EmailVerification = ({ params }) => {
  const { token } = use(params); // ✅ Correct way — don't use use(params)
  const [isVerify, setIsVerify] = useState(null); // null = loading

  useEffect(() => {
    const verify = async () => {
      try {
        const { data: verificationResponse } = await axios.post('/api/auth/verify-email', { token });
        console.log(verificationResponse);
        setIsVerify(verificationResponse.success);
      } catch (error) {
        console.error(error);
        setIsVerify(false);
      }
    };
    verify();
  }, [token]);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1600&q=80')" // 👈 replace with your image path
      }}
    >
      <Card className="w-[400px] bg-white/80 backdrop-blur-md shadow-xl rounded-2xl">
        <CardContent className="p-6">
          {isVerify === null ? (
            <div className="text-center text-gray-500">Verifying your email...</div>
          ) : isVerify ? (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={verifiedImg}
                  alt="verified"
                  height={100}
                  width={100}
                  className="h-[100px] w-auto"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold my-5 text-green-600">Email verification successful!</h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-center items-center">
                <Image
                  src={failedImg}
                  alt="verification failed"
                  height={100}
                  width={100}
                  className="h-[100px] w-auto"
                />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold my-5 text-red-600">Email verification failed</h1>
                <Button asChild>
                  <Link href={WEBSITE_HOME}>Continue Shopping</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
