// services/authService.js
export function createAuthService({
  db,
  userModel,
  otpModel,
  sendMail,
  emailVerificationLink,
  otpEmail,
  jwtSigner,
  generateOTP
}) {
  return {
    async login({ email, password, secretKey, baseUrl }) {
      await db.connect();

      // Find user
      const user = await userModel.findOne({ deletedAt: null, email }).select("+password");
      if (!user) {
        return { success: false, status: 400, message: "Invalid credential" };
      }

      // Check email verification
      if (!user.isEmailVerified) {
        const token = await jwtSigner({ userID: user._id.toString() }, secretKey);
        await sendMail(
          "Email Verification request from Sonu kumar",
          email,
          emailVerificationLink(`${baseUrl}/auth/verify-email/${token}`)
        );
        return {
          success: false,
          status: 401,
          message: "Your Email is not verified. We have sent a verification link."
        };
      }

      // Check password
      const isPasswordVerified = await user.comparePassword(password);
      if (!isPasswordVerified) {
        return { success: false, status: 400, message: "Invalid credential" };
      }

      // Generate OTP
      await otpModel.deleteMany({ email });
      const otp = generateOTP();
      const newOTPData = new otpModel({ email, otp });
      await newOTPData.save();

      const mailStatus = await sendMail("Your Login verification code", email, otpEmail(otp));
      if (!mailStatus.success) {
        return { success: false, status: 400, message: "Failed to send OTP" };
      }

      return { success: true, status: 200, message: "Please verify your device" };
    }
  };
}
