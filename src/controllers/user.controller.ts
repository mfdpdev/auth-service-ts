import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async signin(req: Request, res: Response, next: NextFunction){
    try {
      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: ""
      });
    } catch (e) {
      next(e);
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction){
    try {
      const data = await UserService.signup(req.body);
      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: {
          id: data.id,
          name: data.name,
          username: data.username,
        }
      });
    } catch (e: any) {
      next(e);
    }
  }

  static async signout(req: Request, res: Response, next: NextFunction){
    try {
      res.status(200).json({
        data: "ok"
      });
    } catch (e) {
      next(e);
    }
  }
}
