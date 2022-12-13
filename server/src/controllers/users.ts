import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma";
import asyncWrapper from "../middleware/asyncWrapper";

import { generateAccessToken, generateRefreshToken } from "../utils/generateToken";

export const addUser = asyncWrapper(async (req: Request, res: Response) => {
  if (!req.body || !req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "Some values are empty." });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // creates a user in db
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    },
  });

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

  return res.status(201).json({
    user: userWithoutPassword,
    accessToken: accessToken,
  });
});

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        pets: false,
        reminders: false,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }
    const { password, pets, reminders, ...userWithoutPassword } = user;
    return res.status(200).json({
      pets: pets,
      reminders: reminders,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Something went wrong when retrieving data" });
  }
});
