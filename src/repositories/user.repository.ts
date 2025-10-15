import { AppDataSource } from "../config/database.config";
import { User } from "../entities/user.entity";

export class UserRepository {
  static async findUserById(id: string): Promise<User | null>{
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        id: id
      }
    });

    return user;
  }
}
