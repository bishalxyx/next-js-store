import { ITokenService } from "@/lib/interfaces/ITokenServices";
import { SignJWT } from "jose";

export class TokenService extends ITokenService {
  async createToken(payload) {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    return new SignJWT(payload)
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
  }
}
