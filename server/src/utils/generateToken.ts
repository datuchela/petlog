import jwt from "jsonwebtoken";

type Payload = {};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export const generateAccessToken = (payload: Payload): string | any => {
  try {
    if (!ACCESS_TOKEN_SECRET) throw Error;
    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    return accessToken;
  } catch (error: any) {
    return error;
  }
};

export const generateRefreshToken = (payload: Payload): string | any => {
  try {
    if (!REFRESH_TOKEN_SECRET) throw Error;
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    return refreshToken;
  } catch (error) {
    return error;
  }
};
