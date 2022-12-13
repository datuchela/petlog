import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { prisma } from "../prisma";

import asyncWrapper from "../middleware/asyncWrapper";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

interface ExtendedJwtPayload extends JwtPayload {
  id: number;
}

export const authenticate = asyncWrapper(async (req: Request, res: Response) => {
  if (!req.body || !req.body.usernameOrEmail || !req.body.password) {
    console.log(req.body);
    return res.status(400).json({ msg: "Some values are empty." });
  }

  // finds an user in db with username or email
  const user =
    (await prisma.user.findUnique({
      where: {
        username: req.body.usernameOrEmail,
      },
      include: {
        pets: false,
        reminders: false,
      },
    })) ||
    (await prisma.user.findUnique({
      where: {
        email: req.body.usernameOrEmail,
      },
      include: {
        pets: false,
        reminders: false,
      },
    }));

  if (!user) {
    return res.status(404).json({ msg: "User not found." });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  const accessToken = generateAccessToken({
    id: user.id,
    username: user.username,
  });
  const refreshToken = generateRefreshToken({
    id: user.id,
    username: user.username,
  });

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  const { password, ...userWithoutPassword } = user;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 2592000000,
    path: "/",
  });

  return res.status(200).json({
    user: userWithoutPassword,
    accessToken: accessToken,
  });
});

export const refreshToken = asyncWrapper(async (req: Request, res: Response) => {
  if (!req.headers.cookie) {
    return res.status(400).json({ msg: "Must provide refresh token" });
  }
  const { refreshToken } = cookie.parse(req.headers.cookie);

  const validRefreshToken = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });
  if (!validRefreshToken) {
    res.clearCookie("refreshToken");
    return res.status(400).json({ msg: "invalid refresh token" });
  }
  try {
    if (!process.env.REFRESH_TOKEN_SECRET)
      return res.status(500).json({ msg: "Something went wrong on the server" });
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userFromDatabase = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        pets: false,
        reminders: false,
      },
    });

    if (!userFromDatabase) return res.status(404).json({ msg: "User not found" });

    const { password, ...userWithoutPassword } = userFromDatabase;

    const accessToken = generateAccessToken({
      id: userFromDatabase?.id,
      username: userFromDatabase?.username,
    });

    return res.status(200).json({
      user: userWithoutPassword,
      accessToken: accessToken,
    });

    // handle errors
  } catch (error: any) {
    console.error(error);
    await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    res.clearCookie("refreshToken");
    return res.status(401).json({ logOut: true, msg: error.message });
  }
});

export const logOut = asyncWrapper(async (req: Request, res: Response) => {
  if (!req.headers.cookie) {
    return res.status(401).json({ msg: "Must provide refresh token to logout" });
  }
  const { refreshToken } = cookie.parse(req.headers.cookie);
  try {
    await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "logged out" });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong on the server." });
  }
});
