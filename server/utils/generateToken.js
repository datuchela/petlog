const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
  try {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    return accessToken;
  } catch (error) {
    return error;
  }
};

const generateRefreshToken = (payload) => {
  try {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    return refreshToken;
  } catch (error) {
    return error;
  }
};

module.exports = { generateAccessToken, generateRefreshToken };
