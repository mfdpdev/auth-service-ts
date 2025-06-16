import express from "express";
import { publicRouter } from "../routes/public-api";
import { errorMiddleware } from "../middlewares/error.middleware";
import { apiRouter } from "../routes/api";

export const web = express();
web.use(express.json());
const prefix: string = "/api/v1";

web.use(prefix, publicRouter);
web.use(prefix, apiRouter);

web.use(errorMiddleware);
