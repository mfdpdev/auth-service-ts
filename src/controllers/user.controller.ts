import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  static async signin(req: Request, res: Response, next: NextFunction){
    try {
      const { accessToken, refreshToken, ...data} = await UserService.signin(req.body);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.ENV == "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7 //7 hari
      });

      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: {
          accessToken,
          ...data
        }
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

  static async signout(_: Request, res: Response, next: NextFunction){
    try {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: process.env.ENV == "production",
        sameSite: 'lax' 
      });

      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: "OK",
      });
    } catch (e) {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: process.env.ENV == "production",
        sameSite: 'lax' 
      });
      next(e);
    }
  }

  static async refreshToken(req: Request, res: Response, next: NextFunction){
    try {
      const { accessToken } = await UserService.refreshToken(req.cookies.refreshToken);
      res.status(200).json({
        statusCode: 200,
        status: "success",
        data: {
          accessToken,
        },
      });
    } catch (e) {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: process.env.ENV == "production",
        sameSite: 'lax' 
      });
      next(e);
    }
  }
}
