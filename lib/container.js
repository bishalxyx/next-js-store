import { MongooseDatabase } from "./databaseConnection.js";
import { UserRepository } from "@/repositories/UserRepository.js";
import { EmailService } from "@/services/EmailService.js";
import { TokenService } from "@/services/TokenService.js";

const MONGODB_URI = process.env.MONGODB_URI;

export const container = {
  db: new MongooseDatabase(MONGODB_URI, "next-js-ecommerce"),
  userRepo: new UserRepository(),
  emailService: new EmailService(),
  tokenService: new TokenService(),
};
