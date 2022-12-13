import jwt from "jsonwebtoken";
import asyncWrapper from "./asyncWrapper";
import type { Request, Response, NextFunction } from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const verifyAccessToken = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({ msg: "No token found" });
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    if (!ACCESS_TOKEN_SECRET)
      return res.status(500).json({ msg: "Something went wrong on the server" });
    const { id } = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    req.userId = id;
  } catch (error: any) {
    console.log(error.message);
    return res.status(403).json({ msg: "Bad token" });
  }
  return next();
});

export default verifyAccessToken;
