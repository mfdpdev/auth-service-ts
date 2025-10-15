import express from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);
apiRouter.delete('/auth/signout', UserController.signout);
