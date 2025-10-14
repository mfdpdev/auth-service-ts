import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    res.status(401).json({
      status: 401,
      message: ""
    });
  }

  jwt.verify(token!, process.env.ACCESS_TOKEN!, (err, user) => {
    if (err) {
      res.status(403).json({
        status: 403,
        message: ""
      });
    }
    req.user = user;
    next();
  });
}
