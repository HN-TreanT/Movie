const Users = require("../model/user.model");
const { generateJwt, generateOnlyJwt } = require("../helper/generateJwt");
const bcrypt = require("bcryptjs");
const {
  responseServerError,
  responseInValid,
  responseSuccessWithData,
} = require("../helper/ResponseRequests");
const verifyRefreshToken = require("../helper/verifyRefreshToken");
const salt = bcrypt.genSaltSync(10);
exports.Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return responseInValid({ res, message: "Không thể xác thực người dùng" });
    }
    const user = await Users.findOne({ username: username });
    if (user) {
      let check = bcrypt.compareSync(password, user.password);
      if (check) {
        const { err, accessToken, refreshToken } = await generateJwt({
          username: username,
          id: user.userId,
        });
        if (err) {
          return responseServerError({ res, err: err.message });
        }
        return responseSuccessWithData({
          res,
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
            user: user,
          },
        });
      } else {
        return responseInValid({ res, message: "password incorrect" });
      }
    } else {
      return responseInValid({ res, message: "user name is invalid" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.RefreshToken = async (req, res) => {
  const refreshToken = req.headers.authorization.split(" ")[1];
  console.log(refreshToken);
  try {
    const { tokenDetails } = await verifyRefreshToken(refreshToken);
    const user = await Users.findOne({ userId: tokenDetails.id });
    if (!user) {
      return responseServerError({ res, err: "user not exist" });
    } else {
      const payload = {
        username: tokenDetails.username,
        id: tokenDetails.id,
      };
      const response = await generateOnlyJwt(payload);
      if (response.status) {
        return responseSuccessWithData({
          res,
          data: {
            accessToken: response.accessToken,
            refreshToken: refreshToken,
          },
        });
      } else {
        return responseServerError({ res, err: response.message });
      }
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
