const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generateJwt(payload) {
  try {
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_TOKEN,
    });
    const refreshToken = await jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: process.env.EXPIRE_REFRESG_TOKEN,
    });
    return { status: true, accessToken: token, refreshToken: refreshToken };
  } catch (err) {
    return { status: false, message: err };
  }
}
async function generateOnlyJwt(payload) {
  try {
    const accessToken = await jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_TOKEN,
    });
    return { status: true, accessToken: accessToken };
  } catch (err) {
    return { status: false, message: err };
  }
}

module.exports = { generateJwt, generateOnlyJwt };
