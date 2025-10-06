import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import {  useForm } from 'react-hook-form'
import { Form,FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import ButtonLoading from './ButtonLoading'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { zSchema } from '@/lib/zodSchema'
import { showToast } from '@/lib/showToast'
import axios from 'axios'

const OtpValidation = ({ email, onSubmit, loading }) => {
const [isResendOtp,setIsResendOtp]=useState(false)

    const fromSchema = zSchema.pick({
        otp: true, email: true
    })

    const form = useForm({
        resolver: zodResolver(fromSchema),
        defaultValues: {
            otp: "",
            email: email
        }
    })

    const handleOtpVerification = async (values) => {
     onSubmit(values)
    }
    const resendOtp=async ()=>{
        try {
        setIsResendOtp(true);
        const { data: registerResponse } = await axios.post('/api/auth/resend-otp',{
            email
        });
        console.log(registerResponse); // See the actual response
        if (!registerResponse.success) {
         throw new Error(registerResponse.message)
        }
        
        showToast('success', registerResponse.message);
    } catch (error) {
        showToast('error', error.message);
    } finally {
        setIsResendOtp(false);
    }
    }
    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleOtpVerification)} >
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold mb-2'>Please complete verification</h1>
                        <p className='text-md'>We have sent an One-time Password (OTP) to your registered email address.The OTP is valid for 10 minutes </p>
                    </div>
                    <div className="mb-5 mt-5 flex justify-center">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">One-Time Password (OTP)</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot className='text-xl size-10' index={0} />
                                                <InputOTPSlot className='text-xl size-10' index={1} />
                                                <InputOTPSlot className='text-xl size-10' index={2} />
                                                <InputOTPSlot className='text-xl size-10' index={3} />
                                                <InputOTPSlot className='text-xl size-10' index={4} />
                                                <InputOTPSlot className='text-xl size-10' index={5} />
                                            </InputOTPGroup> 
                                        </InputOTP>
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div>
                        <ButtonLoading loading={loading} type="submit" text="Verify" className="w-full cursor-pointer" />
                        <div className='text-center mt-5'>
                            {!isResendOtp?<button onClick={resendOtp} type='button' className='text-blue-500 cursor-pointer hover:underline'>Resend OTP</button>
                        :<span className='text-md'>Resending..</span>}
                        </div>
                            
                    </div>


                </form>
            </Form>
        </div>
    )
}

export default OtpValidation