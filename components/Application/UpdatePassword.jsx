"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { zSchema } from "@/lib/zodSchema"
import z, { email } from "zod"
// import { Button } from "@/components/ui/button"
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
import axios from "axios"
import { showToast } from "@/lib/showToast"
import { useRouter } from "next/navigation"
import { WEBSITE_LOGIN } from "@/routes/WebsiteRoute"

const UpdatePassowrd = ({email}) => {
    const router=useRouter();
    const [loading, setLoading] = useState(false);
    const [isTypePassword, setIsTypePassword] = useState(true);
    const formSchema = zSchema.pick({
        email:true,password: true
    }).extend({
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Password and confirm Paswword must be same',
        path: ['confirmPassword']
    })

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email:email,
            password: "",
            confirmPassword: ""
        },
    })

    const handlePasswordUpdate = async (values) => {
        try {
            setLoading(true);
            const {data:registerResponse}=await axios.put('/api/auth/reset-password/update-password',values);
            console.log(registerResponse);
            if(!registerResponse.success){
                throw new Error(registerResponse.message);
            }
            form.reset();
            showToast('success',registerResponse.message);
            router.push(WEBSITE_LOGIN)
        } catch (error) {
            showToast('error',error.message)
        }
        finally{
            setLoading(false);
        }
    }
    return (
        
            <div >
                
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Update Password</h1>
                    <p>Create new password by filling out the form below</p>
                </div>
                <div className="mt-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handlePasswordUpdate)} >
                            
                            
                            <div className="mb-5">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input className="bg-white text-black placeholder-gray-500" type="password" placeholder="*********" {...field} />
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
                                                <Input className="bg-white text-black placeholder-gray-500" type={isTypePassword ? 'password' : 'text'} placeholder="*********" {...field} />
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
                                <ButtonLoading loading={loading} type="submit" text="Update Password" className="w-full cursor-pointer" />
                            </div>
                            

                        </form>
                    </Form>
                </div>
            </div>
    )
}

export default UpdatePassowrd;