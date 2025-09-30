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
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute"
import axios from "axios"
import { showToast } from "@/lib/showToast"

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const formSchema = zSchema.pick({
        email: true, password: true, name: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm Paswword must be same',
        path: ['confirmPassword']
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const handleRegister = async (value) => {
        try {
            setLoading(true);
            const {data:registerResponse}=await axios.post('/api/auth/register',value);
            if(!registerResponse.success){
                throw new Error(registerResponse.message);
            }
            form.reset();
            showToast('success',registerResponse.message);
            
        } catch (error) {
            showToast('error',error.message)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <Card>
            <CardContent className='w-[400px]'>
                <div className='flex justify-center'>
                    <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt='logo' className='max-w-[150px]' />
                </div>
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Create Account</h1>
                    <p>Create account by filling out the form below</p>
                </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleRegister)} >
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" placeholder="Sonu Kumar" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" placeholder="*********" {...field} />
                                            </FormControl>


                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Confirm Password</FormLabel>
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
                            <div className="mb-3">
                                <ButtonLoading loading={loading} type="submit" text="Create Account" className="w-full cursor-pointer" />
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center items-center gap-1">
                                    <p>Already have Account</p>
                                    <Link href={WEBSITE_LOGIN} className="text-primary underline">Login</Link>
                                </div>

                            </div>

                        </form>
                    </Form>
                </div>
            </CardContent>
        </Card >
    )
}

export default Login