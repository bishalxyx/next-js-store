import { connectDb } from "@/lib/connectDb";
import { catchError, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import OTPMODEL from "@/models/otpModel";
import UserModel from "@/models/userModel";
import { SignJWT } from "jose";
import { cookies } from "next/headers";


export async function POST(request){
    try {
        await connectDb();
        const payload=await request.json();
        const validationSchema=zSchema.pick({
            otp:true,email:true
        })

        const validatedData=validationSchema.safeParse(payload);
        if(!validatedData){
            return response(false,401,'Inavalid or missing input field',validatedData.error)
        }
        const {email,otp}=validatedData.data;
        const getOtpData=await OTPMODEL.findOne({email,otp});
        if(!getOtpData){
            return response(false,404,'Inavalid or expired otp',validatedData.error)
        }
        const getUser=await UserModel.findOne({deletedAt:null,email}).lean();
        if(!getUser){
            return response(false,404,'User not found');
        }
        
        await getOtpData.deleteOne();
        return response(true,200,'Otp Verified');
        
    } catch (error) {
        return catchError(error);
    }
}