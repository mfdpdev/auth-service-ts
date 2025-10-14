import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/database.config";
import { ResponseError } from "../errors/response.error";
import bcrypt from "bcrypt";

export class UserService {
  static async signup(request: {
    name: string,
    username: string,
    password: string,
  }): Promise<User> {
    const validatedData = Validation.validate(UserValidation.SIGNUP, request);

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: {
        username: validatedData.username
      }
    });

    if (existingUser){
      //error
      throw new ResponseError(400, "Username already taken");
    }

    const user = new User();
    user.name = validatedData.name;
    user.username = validatedData.username;

    const saltRounds = 10;
    user.password = await bcrypt.hash(validatedData.password, saltRounds);

    await userRepository.save(user);
    return user;
  }

  static async signin(request: {
    username: string,
    password: string,
  }): Promise<null> {
    const validatedData = Validation.validate(UserValidation.SIGNIN, request);
    return null;
  }

  static async signout(){

  }
}
