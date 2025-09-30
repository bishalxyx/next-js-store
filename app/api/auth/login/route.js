import { emailVerificationLink } from "@/email/emailVerification";
import { otpEmail } from "@/email/otpVerification";
import { connectDb } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OTPMODEL from "@/models/otpModel";
import UserModel from "@/models/userModel";
import { SignJWT } from "jose";
import z from "zod";

export async function POST(request){
    try {
        await connectDb();
        const payload=await request.json();
        const validationSchema=zSchema.pick({
            email:true
        }).extend({
            password:z.string()
        })
        const validatedData=validationSchema.safeParse(payload);
        if(!validatedData.success){
            return response(false,401,'invalid or missing input field',validatedData.error)
        }
        const {email,password}=validatedData.data;

        const getUser=await UserModel.findOne({deletedAt:null,email}).select("+password");
        // if(!getUser)return response(false,404,'Invalid login credential')

        if(!getUser){
            return response(false,400,'Invalid credential')
        }
         if(!getUser.isEmailVerified){
           const secret = new TextEncoder().encode(process.env.SECRET_KEY);
                   const token = await new SignJWT({ userID: getUser._id.toString() })
                       .setIssuedAt()
                       .setExpirationTime('1h')
                       .setProtectedHeader({ alg: 'HS256' })
                       .sign(secret)
           
                   await sendMail('Email Verification request from Sonu kumar', email,
                        emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))
                        return response(false,401,'Your Email is not verified we have sent a verification link to your registered email address')
         }

        const isPasswordVerified=await getUser.comparePassword(password);
        if(!isPasswordVerified){
            return response(false,400,'Invalid credential')
        }

    //otp
    await OTPMODEL.deleteMany({email});
    const otp=generateOTP();
    const newOTPData=new OTPMODEL({
        email,otp
    })
    await newOTPData.save();

    const otpEmailStatus=await sendMail('Your Login verification code',email,otpEmail(otp));
    // console.log(otpEmailStatus);

    if(!otpEmailStatus.success){
                    return response(false,400,'Failed to send Otp')

                    
    }
    return response(true,200,'Please verify your device')


    } catch (error) {
        return catchError(error)
    }
}