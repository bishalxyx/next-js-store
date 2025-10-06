"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import LOGO from '@/public/assets/images/logo-black.png'
import Image from 'next/image'
import { zSchema } from "@/lib/zodSchema"
import z from "zod"
import { Button } from "@/components/ui/button"
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6"
import OtpValidation from "@/components/Application/OtpValidation"
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
import { WEBSITE_LOGIN, WEBSITE_REGISTER, WEBSITE_RESET_PASSWORD } from "@/routes/WebsiteRoute"
import axios from "axios"
import { showToast } from "@/lib/showToast"
import { useRouter } from "next/navigation"

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState();

  const formSchema = zSchema.pick({
    email: true
  }).extend({
    password: z.string().min(3, 'Password is required')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const handleLogin = async (value) => {
    try {
      setLoading(true);
      const { data: registerResponse } = await axios.post('/api/auth/login', value);
      if (!registerResponse.success) throw new Error(registerResponse.message);
      setOtpEmail(value.email);
      form.reset();
      showToast('success', registerResponse.message);
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleOtpVerification = async (value) => {
    try {
      setOtpVerificationLoading(true);
      const { data: registerResponse } = await axios.post('/api/auth/verify-otp', value);
      if (!registerResponse.success) throw new Error(registerResponse.message);
      setOtpEmail('');
      form.reset();
      showToast('success', registerResponse.message);
      router.push('/');
    } catch (error) {
      showToast('error', error.message);
    } finally {
      setOtpVerificationLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      <div className="bg-black/50 absolute inset-0" /> {/* Dark overlay */}

      <Card className="relative z-10 backdrop-blur-md bg-white/10 border border-gray-200 shadow-2xl w-[400px] text-white">
        <CardContent>
          {/* <div className='flex justify-center'>
            <Image
              src={LOGO.src}
              width={LOGO.width}
              height={LOGO.height}
              alt='logo'
              className='max-w-[150px]'
            />
          </div> */}

          {!otpEmail ? (
            <>
              <div className="text-center mt-3">
                <h1 className="text-3xl font-bold">Login Into Account</h1>
                <p className="text-gray-200">Login into your account by filling out the form</p>
              </div>

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
                              <Input
                                type="email"
                                placeholder="example@gmail.com"
                                {...field}
                                className="bg-white text-black placeholder-gray-500"
                              />
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
                              <Input
                                type={isTypePassword ? 'password' : 'text'}
                                placeholder="*********"
                                {...field}
                                className="bg-white text-black placeholder-gray-500"
                              />
                            </FormControl>
                            <button
                              className="absolute top-9 right-3 cursor-pointer text-gray-700"
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

                    <ButtonLoading
                      loading={loading}
                      type="submit"
                      text="Login"
                      className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
                    />

                    <div className="text-center mt-4">
                      <p className="text-sm">
                        Don’t have an account?{" "}
                        <Link href={WEBSITE_REGISTER} className="text-blue-300 underline">
                          Create Account
                        </Link>
                      </p>
                      <div className="mt-2">
                        <Link href={WEBSITE_RESET_PASSWORD} className="text-blue-300 underline">
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </>
          ) : (
            <OtpValidation
              email={otpEmail}
              onSubmit={handleOtpVerification}
              loading={otpVerificationLoading}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default Login
