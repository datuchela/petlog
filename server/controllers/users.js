const { db } = require("../db");
const bcrypt = require("bcrypt");
// const axios = require("axios");
const asyncWrapper = require("../middleware/asyncWrapper");

const addUser = asyncWrapper(async (req, res) => {
  if (
    !req.body ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ status: 400, msg: "Some values are empty." });
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

  // try {
  //   const response = await axios.post(
  //     "/api/auth",
  //     JSON.stringify({ usernameOrEmail: req.username, password: req.password }),
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: true,
  //       baseURL: "http://localhost:5050/",
  //     }
  //   );
  //   console.log(response.data);
  // } catch (error) {
  //   console.log(error);
  // }

  const { password, ...userWithoutPassword } = user;

  res.status(200).json({ status: 200, user: userWithoutPassword });
});

const getUser = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        pets: true,
        reminders: true,
      },
    });
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found." });
    }
    const { password, pets, reminders, ...userWithoutPassword } = user;
    return res
      .status(200)
      .json({
        status: 200,
        pets: pets,
        reminders: reminders,
        user: userWithoutPassword,
      });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, msg: "Something went wrong when retrieving data" });
  }
});

module.exports = { getUser, addUser };
