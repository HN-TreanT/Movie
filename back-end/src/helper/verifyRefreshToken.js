const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../model/user.model");
const { responseServerError } = require("../helper/ResponseRequests");

async function verifyRefreshToken(token) {
  try {
    const result = jwt.verify(token, process.env.REFRESH_SECRET, {
      expiresIn: process.env.EXPIRE_REFRESG_TOKEN,
    });
    if (result) {
      return {
        status: true,
        message: "refresh token valid",
        tokenDetails: result,
      };
    } else {
      return {
        status: false,
        message: "refresh token invalid",
      };
    }
  } catch (err) {
    return { status: false, error: err };
  }
}

module.exports = verifyRefreshToken;
