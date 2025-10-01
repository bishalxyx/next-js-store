// lib/dbProvider.js
import { MongooseDatabase } from "./databaseConnection.js";

const MONGODB_URI = process.env.MONGODB_URI;

export const dbProvider = new MongooseDatabase(
  MONGODB_URI,
  "next-js-ecommerce"
);
