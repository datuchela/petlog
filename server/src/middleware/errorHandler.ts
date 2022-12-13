import type { Request, Response } from "express";

const errorHandler = async (req: Request, res: Response, error: Error) => {
  console.log(error);
  res.status(500).json({ msg: "Something went wrong on the server." });
};

export default errorHandler;
