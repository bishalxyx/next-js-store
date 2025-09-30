"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import LOGO from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"

import OtpValidation from "@/components/Application/OtpValidation"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import ButtonLoading from "@/components/Application/ButtonLoading"
import Link from "next/link"
import { WEBSITE_LOGIN} from "@/routes/WebsiteRoute"
import axios from "axios"
import { showToast } from "@/lib/showToast"
import { catchError } from "@/lib/helperFunction"
import UpdatePassowrd from "@/components/Application/UpdatePassword"
const page = () => {
    const [emailVerificationLoading,setEmailVerificationLoading]=useState(false)
        const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
        const [otpEmail,setOtpEmail]=useState();
        const [isOtpVerified,setIsOtpVerified]=useState(false)
    
     const formSchema = zSchema.pick({
            email: true
        })
    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                email: ""
            },
        })

        const handleEmailVerification=async (values)=>{
          try {
        setEmailVerificationLoading(true);
        const { data: sendOtpResponse } = await axios.post('/api/auth/reset-password/send-otp', values);
        console.log(sendOtpResponse); // See the actual response
        if (!sendOtpResponse.success) {
         throw new Error(sendOtpResponse.message)
        }
        setOtpEmail(values.email)
        // setOtpEmail('');
        // console.log(value.email);
        // form.reset();
        showToast('success', sendOtpResponse.message);
    } catch (error) {
        showToast('error', error.message);
    } finally {
        setEmailVerificationLoading(false);
    }
        }

        const handleOtpVerification=async (values)=>{
        try {
        setOtpVerificationLoading(true);
        const { data: registerResponse } = await axios.post('/api/auth/reset-password/verify-otp', values);
        console.log(registerResponse); // See the actual response
        if (!registerResponse.success) {
         throw new Error(registerResponse.message)
        }
        // setOtpEmail('');
        // console.log(value.email);
        // form.reset();
        showToast('success', registerResponse.message);
        setIsOtpVerified(true);
    } catch (error) {
        showToast('error', error.message);
    } finally {
        setOtpVerificationLoading(false);
    }
    }

  return (
    <Card>
            <CardContent className='w-[400px]'>
                <div className='flex justify-center'>
                    <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt='logo' className='max-w-[150px]' />
                </div>
                {!otpEmail
                ?
                <>
                <div className="text-center">
                        <h1 className="text-3xl font-bold">Reset Password</h1>
                        <p>Enter your email for password reset</p>
                    </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEmailVerification)} >
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="example@gmail.com" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <ButtonLoading loading={emailVerificationLoading} type="submit" text="Send OTP" className="w-full cursor-pointer" />
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center items-center gap-1">
                                
                                    <Link href={WEBSITE_LOGIN} className="text-primary underline">Back To Login</Link>
                                </div>
                                
                            </div>

                        </form>
                    </Form>
                </div>
                </>
                :
                <>
                {!isOtpVerified
                ?
                <OtpValidation email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading}/>
                :
                <UpdatePassowrd email={otpEmail}/>
            }
                </>
            }
                
            </CardContent>
        </Card >
  )
}

export default page