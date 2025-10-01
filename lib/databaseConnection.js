// lib/MongooseDatabase.js
import mongoose from "mongoose";
import { IDatabase } from "./interfaces/IDatabase.js";

export class MongooseDatabase extends IDatabase {
  constructor(uri, dbName) {
    super();
    this.uri = uri;
    this.dbName = dbName;
    this.cached = { conn: null, promise: null };
  }

  async connect() {
    if (this.cached.conn) return this.cached.conn;

    if (!this.cached.promise) {
      this.cached.promise = mongoose.connect(this.uri, {
        dbName: this.dbName,
        bufferCommands: false,
      });
    }

    this.cached.conn = await this.cached.promise;
    return this.cached.conn;
  }
}
