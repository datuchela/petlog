const { db } = require("../db");
const bcrypt = require("bcrypt");
const asyncWrapper = require("../middleware/asyncWrapper");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

const addUser = asyncWrapper(async (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ msg: "Some values are empty." });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // creates a user in db
  const user = await db.user.create({
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

  await db.refreshToken.create({
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

const getUser = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  try {
    const user = await db.user.findUnique({
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
    return res
      .status(500)
      .json({ msg: "Something went wrong when retrieving data" });
  }
});

module.exports = { getUser, addUser };
