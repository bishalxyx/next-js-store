import { emailVerificationLink } from "@/email/emailVerification";
import { connectDb } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/userModel";
import { SignJWT } from "jose";

export async function POST(request) {
    try {
        await connectDb();
        const validationSchema = zSchema.pick({
            name: true, email: true, password: true
        })

        const payload = await request.json();
        const validatedData = validationSchema.safeParse(payload);
        if (!validatedData) {
            return response(false, 401, 'invalid or mising input', validatedData.error)
        }
        const { name, email, password } = validatedData.data;

        const checkUser = await UserModel.exists({ email });
        if (checkUser) {
            return response(true, 409, 'User already exists',)
        }

        const newResgistration = new UserModel({
            name, email, password
        })
        await newResgistration.save();

        const secret = new TextEncoder().encode(process.env.SECRET_KEY);
        const token = await new SignJWT({ userID: newResgistration._id.toString() })
            .setIssuedAt()
            .setExpirationTime('1h')
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret)

        await sendMail('Email Verification request from Sonu kumar', email,
             emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`))

        return response(true, 200, 'Registration success please verify your email',)     

    } catch (error) {
        catchError(error)
    }
}