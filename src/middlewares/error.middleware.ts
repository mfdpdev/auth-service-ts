import { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors/response.error";
import logger from "../applications/logger";
import { ValidationError } from "joi";

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // if((error as any).isJoi){
  if(error instanceof ValidationError){
    const joiError = error as ValidationError;
    logger.warn({
      msg: 'Validation failed',
      path: req.path,
      method: req.method,
      details: joiError.details,
    });

    res.status(400).json({
      statusCode: 400,
      status: "error",
      errors: error.message
    });
  }else if(error instanceof ResponseError) {
    logger.warn({
      msg: 'Handled ResponseError',
      status: error.status,
      message: error.message,
      path: req.path,
      method: req.method,
    });

    res.status(error.status).json({
      errors: error.message
    });
  }else{

    logger.error({
      msg: 'Unhandled server error',
      error: error.message,
      stack: error.stack,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      errors: error.message
    });
  }
}
