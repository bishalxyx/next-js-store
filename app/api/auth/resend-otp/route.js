import { otpEmail } from "@/email/otpVerification";
import { connectDb } from "@/lib/databaseConnection";
import { catchError, generateOTP, response } from "@/lib/helperFunction";
import OTPMODEL from "@/models/otpModel";
import UserModel from "@/models/userModel";


export async function POST(request){
    try {
        await connectDb();
        const payload=await request.json();
        const validationSchema=zSchema.pick({
            email:true
        })

        const validatedData=validationSchema.safeParse(payload);
        if(!validatedData.success){
            return response(false,401,'Inavalid or missing input field',validatedData.error)
        }
        const {email}=validatedData.data;
        const getUser=await UserModel.findOne({email})
        if(!getUser){
            return response(false,404,'User not found')
        }
        await OTPMODEL.deleteMany({email});
        const otp=generateOTP();
        const newOtpData=new OTPMODEL({
            email,otp
        })
        await newOtpData.save();

        const otpSendStatus=await  await sendMail('Your verification code', email,otpEmail(otp))

        if(!otpSendStatus){
            return response(false,400,'failed to resend otp')
        }
        return response(true,200,'OTP sent successfully')
    }
    catch(error){
        catchError(error)
    }
}