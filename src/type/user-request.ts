import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface UserRequest extends Request {
  user?: any
}

export interface SignUpRequest {
  name: string,
  username: string,
  password: string,
}

export interface SignInRequest {
  username: string,
  password: string,
}
