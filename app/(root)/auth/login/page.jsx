"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import LOGO from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import z, { email } from "zod"
import { Button } from "@/components/ui/button"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
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
import { WEBSITE_LOGIN, WEBSITE_REGISTER } from "@/routes/WebsiteRoute"
import axios from "axios"
import { showToast } from "@/lib/showToast"
import { catchError } from "@/lib/helperFunction"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const [otpEmail,setOtpEmail]=useState();

    const formSchema = zSchema.pick({
        email: true
    }).extend({
        password: z.string().min('3', 'Password is required')
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
// console.log(otpEmail);
    const handleLogin = async (value) => {
    try {
        setLoading(true);
        const { data: registerResponse } = await axios.post('/api/auth/login', value);
        console.log(registerResponse); // See the actual response
        if (!registerResponse.success) {
         throw new Error(registerResponse.message)
        }
        setOtpEmail(value.email);
        console.log(value.email);
        form.reset();
        showToast('success', registerResponse.message);
    } catch (error) {
        showToast('error', error.message);
    } finally {
        setLoading(false);
    }
}

    const handleOtpVerification=async (value)=>{
        try {
        setOtpVerificationLoading(true);
        const { data: registerResponse } = await axios.post('/api/auth/verify-otp', value);
        console.log(registerResponse); // See the actual response
        if (!registerResponse.success) {
         throw new Error(registerResponse.message)
        }
        setOtpEmail('');
        console.log(value.email);
        form.reset();
        showToast('success', registerResponse.message);
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
                
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLogin)} >
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
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type={isTypePassword ? 'password' : 'text'} placeholder="*********" {...field} />
                                            </FormControl>
                                            <button className="absolute top-1/2 right-2 cursor-pointer" type="button" onClick={() => setIsTypePassword(!isTypePassword)}>
                                                {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <ButtonLoading loading={loading} type="submit" text="Login" className="w-full cursor-pointer" />
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center items-center gap-1">
                                    <p>Dont'have account</p>
                                    <Link href={WEBSITE_REGISTER} className="text-primary underline">Create Account</Link>
                                </div>
                                <div className="mt-3">
                                    <Link href="" className="text-primary underline">Forgot Password</Link>
                                </div>
                            </div>

                        </form>
                    </Form>
                </div>
                </>
                :
                <>
                <OtpValidation email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading}/>
                </>
            }
                
            </CardContent>
        </Card >
    )
}

export default Login