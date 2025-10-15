import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../config/database.config";
import { ResponseError } from "../errors/response.error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignInRequest, SignUpRequest } from "../type/user-request";

export class UserService {
  static async signup(request: SignUpRequest): Promise<User> {
    const validatedData = Validation.validate(UserValidation.SIGNUP, request);

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({
      where: {
        username: validatedData.username
      }
    });

    if (existingUser){
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

  static async signin(request: SignInRequest): Promise<{
    id: string,
    name: string,
    username: string,
    accessToken: string,
    refreshToken: string,
  }> {
    const validatedData = Validation.validate(UserValidation.SIGNIN, request);

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: {
        username: validatedData.username
      }
    });

    if (!user){
      throw new ResponseError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password)
    if(!isPasswordValid){
      throw new ResponseError(400, "Invalid password");
    }

    const accessToken = jwt.sign({
      id: user.id,
      username: user.username,
    }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m"
    });
    const refreshToken = jwt.sign({
      id: user.id,
      username: user.username,
    }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: "7d"
    });

    return {
      id: user.id,
      name: user.name,
      username: user.name,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  static async refreshToken(refreshToken: string){
    if (refreshToken == null) {
      throw new ResponseError(401, "Unauthorized");
    }

    const decodeUser: any = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    const accessToken = jwt.sign({
      id: decodeUser.id,
      username: decodeUser.username,
    }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m"
    });

    return {
      accessToken: accessToken,
    }
  }
}
