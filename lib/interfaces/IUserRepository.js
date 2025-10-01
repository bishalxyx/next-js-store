export class IUserRepository {
  async userExists(email) { throw new Error("userExists() must be implemented"); }
  async createUser(data) { throw new Error("createUser() must be implemented"); }
}
