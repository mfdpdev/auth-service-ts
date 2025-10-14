import { UserValidation } from "../validations/user-validation";
import { Validation } from "../validations/validation";

export class UserService {
  static async signup(request: any): Promise<null> {
    const validatedData = Validation.validate(UserValidation.SIGNUP, request);
    return null;
  }

  static async signin(){

  }

  static async signout(){

  }
}
