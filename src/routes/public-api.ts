import express from "express";
import { UserController } from "../controllers/user.controller";

export const publicRouter = express.Router();

publicRouter.post('/auth/signin', UserController.signin);
publicRouter.post('/auth/signup', UserController.signup);
publicRouter.post('/auth/refresh', UserController.refreshToken);
