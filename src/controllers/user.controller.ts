import { NextFunction, Request, Response } from "express";

export class UserController {
  static async signin(req: Request, res: Response, next: NextFunction){
    try {
      res.status(200).json({
        data: "ok"
      });
    } catch (e) {
      next(e);
    }
  }

  static async signup(req: Request, res: Response, next: NextFunction){
    try {
      res.status(200).json({
        data: "ok"
      });
    } catch (e) {
      next(e);
    }
  }
}
