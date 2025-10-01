import { connectDb } from "@/lib/connectDb";
import { response, catchError, generateOTP } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { emailVerificationLink } from "@/email/emailVerification";
import { otpEmail } from "@/email/otpVerification";
import UserModel from "@/models/userModel";
import OTPModel from "@/models/otpModel";
import { SignJWT } from "jose";
import { createAuthService } from "@/services/authService";
import { zSchema } from "@/lib/zodSchema";
import z from "zod";

// Helper to sign JWT
async function jwtSigner(payload, secretKey) {
  const secret = new TextEncoder().encode(secretKey);
  return new SignJWT(payload)
    .setIssuedAt()
    .setExpirationTime("1h")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
}

export async function POST(request) {
  try {
    const body = await request.json();

    const schema = zSchema.pick({ email: true }).extend({
      password: z.string()
    });
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return response(false, 401, "Invalid or missing input field", parsed.error);
    }

    // Build DI Container
    const authService = createAuthService({
      db: { connect: connectDb },
      userModel: UserModel,
      otpModel: OTPModel,
      sendMail,
      emailVerificationLink,
      otpEmail,
      jwtSigner,
      generateOTP
    });

    // Use the service
    const result = await authService.login({
      email: parsed.data.email,
      password: parsed.data.password,
      secretKey: process.env.SECRET_KEY,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL
    });

    return response(result.success, result.status, result.message);
  } catch (err) {
    return catchError(err);
  }
}
