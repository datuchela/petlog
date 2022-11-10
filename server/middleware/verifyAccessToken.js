const jwt = require("jsonwebtoken");
const asyncWrapper = require("./asyncWrapper");

const verifyAccessToken = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  if (!authHeader) {
    return res.status(403).json({ msg: "No token found" });
  }
  const accessToken = authHeader.split(" ")[1];
  try {
    const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = id;
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ msg: "Bad token" });
  }
  return next();
});

module.exports = verifyAccessToken;
