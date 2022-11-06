const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { db } = require("../db");

const asyncWrapper = require("../middleware/asyncWrapper");

const authenticate = asyncWrapper(async (req, res) => {
  if (!req.body || !req.body.usernameOrEmail || !req.body.password) {
    console.log(req.body);
    return res.status(400).json({ msg: "Some values are empty." });
  }

  // finds an user in db with username or email
  const user =
    (await db.user.findUnique({
      where: {
        username: req.body.usernameOrEmail,
      },
      include: {
        pets: true,
        reminders: true,
      },
    })) ||
    (await db.user.findUnique({
      where: {
        email: req.body.usernameOrEmail,
      },
      include: {
        pets: true,
        reminders: true,
      },
    }));

  if (!user) {
    return res.status(404).json({ msg: "User not found." });
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).json({ msg: "Invalid Credentials" });
  }

  // TODO: use .env file for secrets
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "10s",
    }
  );

  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "15s",
    }
  );

  await db.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
    },
  });

  const { password, pets, reminders, ...userWithoutPassword } = user;

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 2592000000,
    path: "/",
  });

  return res.status(200).json({
    user: userWithoutPassword,
    pets: pets,
    reminders: reminders,
    accessToken: accessToken,
  });
});

const refreshToken = asyncWrapper(async (req, res) => {
  if (!req.headers.cookie) {
    return res.status(400).json({ msg: "Must provide refresh token" });
  }
  const { refreshToken } = cookie.parse(req.headers.cookie);

  const validRefreshToken = await db.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });
  if (!validRefreshToken) {
    res.clearCookie("refreshToken");
    return res.status(400).json({ msg: "invalid refresh token" });
  }
  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userFromDatabase = await db.user.findUnique({
      where: { id: user.id },
      include: {
        pets: true,
        reminders: true,
      },
    });
    const { password, pets, reminders, ...userWithoutPassword } =
      userFromDatabase;
    const accessToken = jwt.sign(
      { id: userFromDatabase.id, username: userFromDatabase.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    return res.status(200).json({
      user: userWithoutPassword,
      pets: pets,
      reminders: reminders,
      accessToken: accessToken,
    });
  } catch (error) {
    console.error(error);
    await db.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    res.clearCookie("refreshToken");
    return res.status(400).json({ logOut: true, msg: error.message });
  }
});

const logOut = asyncWrapper(async (req, res) => {
  if (!req.headers.cookie) {
    return res
      .status(401)
      .json({ msg: "Must provide refresh token to logout" });
  }
  const { refreshToken } = cookie.parse(req.headers.cookie);
  try {
    await db.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    res.clearCookie("refreshToken");
    return res.status(200).json({ msg: "logged out" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong on the server." });
  }
});

module.exports = { authenticate, refreshToken, logOut };
