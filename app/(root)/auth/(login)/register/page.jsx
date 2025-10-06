"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import LOGO from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import z from "zod"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import {
    Form,
    FormControl,
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

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);

    const formSchema = zSchema.pick({
        email: true, password: true, name: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm password must be same',
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
            const { data: registerResponse } = await axios.post('/api/auth/register', value);
            if (!registerResponse.success) {
                throw new Error(registerResponse.message);
            }
            form.reset();
            showToast('success', registerResponse.message);
        } catch (error) {
            showToast('error', error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1600&q=80')`,
            }}
        >
            {/* Overlay for better contrast */}
            <div className="absolute inset-0 bg-black/60"></div>

            <Card className="relative z-10 backdrop-blur-lg bg-white/10 shadow-xl border border-white/20">
                <CardContent className="w-[400px] text-white">
                    {/* <div className='flex justify-center'>
                        <Image src={LOGO.src} width={LOGO.width} height={LOGO.height} alt='logo' className='max-w-[150px]' />
                    </div> */}
                    <div className='text-center'>
                        <h1 className='text-3xl font-bold'>Create Account</h1>
                        <p className='text-gray-200'>Create account by filling out the form below</p>
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
                                                    <Input type="text" placeholder="Sonu Kumar" {...field} className="bg-white text-black placeholder-gray-500" />
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
                                                    <Input type="email" placeholder="example@gmail.com" {...field} className="bg-white text-black placeholder-gray-500" />
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
                                                    <Input type="password" placeholder="*********" {...field} className="bg-white text-black placeholder-gray-500" />
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
                                                    <Input type={isTypePassword ? 'password' : 'text'} placeholder="*********" {...field} className="bg-white text-black placeholder-gray-500" />
                                                </FormControl>
                                                <button
                                                    className="absolute top-1/2 right-2 cursor-pointer text-white"
                                                    type="button"
                                                    onClick={() => setIsTypePassword(!isTypePassword)}
                                                >
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
                                        <p>Already have an account?</p>
                                        <Link href={WEBSITE_LOGIN} className="text-primary underline">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Register
