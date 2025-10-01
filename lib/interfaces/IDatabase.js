export class IDatabase {
  async connect() {
    throw new Error("connect() must be implemented by the subclass");
  }
}
