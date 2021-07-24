const jwt = require("jsonwebtoken");
const { sendFailStatus, sendSuccessStatus } = require("../utils/sendStatus");
require("dotenv").config();

module.exports = async (req, res, next) => {
  // Retrieve token from user
  const jwtToken = req.header("jwt_token");

  // Check if user has a token
  if (!jwtToken) {
    return sendFailStatus(res, 403, "authorization denied");
  }

  try {
    // Verify that token is valid
    const verify = jwt.verify(jwtToken, process.env.JWTSECRET);
    req.user = verify.user;
    next();
  } catch (err) {
    // Log error message to console
    console.log(err.message);
    // Respond to request
    return sendFailStatus(res, 401, "token is not valid");
  }
};
