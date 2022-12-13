import type { Request, Response } from "express";

export const error = async (req: Request, res: Response) => {
  res.status(404).json({ msg: "Route not found" });
};
