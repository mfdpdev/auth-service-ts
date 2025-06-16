import express from "express";
import { publicRouter } from "../routes/public-api";

export const web = express();
web.use(express.json());
const prefix: string = "/api/v1";

web.use(prefix, publicRouter);
// web.use(prefix, api);
// web.use(prefix, error);
