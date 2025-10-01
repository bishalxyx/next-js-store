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
        const loggedInUserData={
            _id:getUser._id,
            role:getUser.role,
            name:getUser.name,
            avatar:getUser.avatar,
        }
        const secret=new TextEncoder().encode(process.env.SECRET_KEY);
        const token=await new SignJWT(loggedInUserData)
        .setIssuedAt()
        .setExpirationTime('24h')
        .setProtectedHeader({alg:'HS256'})
        .sign(secret)

        const cookieStore=await cookies();

        cookieStore.set({
            name:'access_token',
            value:token,
            httpOnly:process.env.NODE_ENV==='production',
            path:'/',
            secure:process.env.NODE_ENV==='production',
            sameSite:'lax'
        })

        await getOtpData.deleteOne();
        return response(true,200,'Login Succesful',loggedInUserData);
        
    } catch (error) {
        return catchError(error);
    }
}