import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../type/user-request";
import { UserRepository } from "../repositories/user.repository";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({
      status: 401,
      message: "Unauthorized: No token provided"
    });
  } else {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

      req.user = user;
      next();
    } catch (err) {
      // Tangani error jika token tidak valid atau expired
      res.status(403).json({
        statusCode: 403,
        status: "error",
        message: "Forbidden: Invalid or expired token"
      });
    }
  }
}
