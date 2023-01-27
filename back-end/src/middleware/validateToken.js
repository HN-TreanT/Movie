const jwt = require("jsonwebtoken");
require("dotenv").config();
const Users = require("../model/user.model");
const { responseServerError } = require("../helper/ResponseRequests");
async function validateToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return res.status(401).json({
      status: false,
      message: "Access token is missing",
    });
  //beaer token
  const token = authorizationHeader.split(" ")[1];

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRE_TOKEN,
    });
    let user = await Users.findOne({
      userId: result.id,
    });

    if (!user) {
      return res.status(403).json({
        status: false,
        message: `Authorization error`,
      });
    }
    req.decoded = result;
    next();
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
}

module.exports = validateToken;
