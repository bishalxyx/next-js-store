// lib/connectDb.js
import { dbProvider } from "./dbProvider.js";

export async function connectDb() {
  return dbProvider.connect();
}
