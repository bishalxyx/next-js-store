import { IUserRepository } from "@/lib/interfaces/IUserRepository.js";
import UserModel from "@/models/userModel";

export class UserRepository extends IUserRepository {
  async userExists(email) {
    return UserModel.exists({ email });
  }

  async createUser(data) {
    const user = new UserModel(data);
    return user.save();
  }
}
