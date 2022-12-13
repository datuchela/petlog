import type { NextFunction, Request, Response } from "express";
import errorHandler from "./errorHandler";

const asyncWrapper = (controller: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (err: any) {
      errorHandler(req, res, err);
    }
  };
};

export default asyncWrapper;
