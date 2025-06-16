import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    next();
  } catch (err) {
    // next(err);
    res.status(401).json({
      errors: "unauthorized"
    });
  }
}
