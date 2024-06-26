const Users = require("../model/user.model");
const userServices = require("../services/userServices");
const removeSign = require("../helper/removeSign");
const { getDir } = require("../helper/file");
const path = require("path");
const root = path.resolve("./");
const { removeDir } = require("../helper/file");
const {
  responseSuccessWithData,
  responseInValid,
  responseServerError,
  reponseSuccess,
} = require("../helper/ResponseRequests");
const { AVARTAR_FOLDER } = require("../helper/constant");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({ isAdmin: false });
    if (!users) {
      return responseInValid({ res, message: "Not have user on database" });
    }
    return responseSuccessWithData({ res, data: users });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.SearchUser = async (req, res) => {
  const searchKey = req.body.search;

  try {
    const users = await Users.find({ isAdmin: false });
    const list = users.filter((user) => {
      if (
        removeSign(user.displayName.toLowerCase()).includes(
          removeSign(searchKey.toLowerCase())
        )
      ) {
        return user;
      } else {
        return;
      }
    });
    if (list.length > 0) {
      return responseSuccessWithData({ res, data: list });
    } else {
      return responseInValid({ res, message: "Not found user" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.getUser = async (req, res) => {
  const { id } = req.decoded;
  try {
    const user = await Users.findOne({ userId: id });
    return responseSuccessWithData({ res, data: user });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.SignUp = async (req, res) => {
  try {
    await userServices.createUser(res, req.body);
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.EditUser = async (req, res) => {
  const { id } = req.decoded;
  const photoURlOld = req.body.photoURlOld;
  const filePath = root + photoURlOld;
  delete req.body.photoURlOld;
  console.log(req.file);
  let data = {};
  const favorite = [];
  if (req.body.favorite) {
    favorite.push(req.body.favorite);
  }
  try {
    if (req.file) {
      data = {
        ...req.body,
        photoURL: AVARTAR_FOLDER + req.file?.filename,
        favorite: favorite,
      };
    } else {
      data = { ...req.body, photoURL: null };
    }
    let user = await Users.findOneAndUpdate({ userId: id }, data, {
      new: true,
    });
    if (user) {
      if (user.photoURL) {
        removeDir({ dir: filePath });
      }
      return reponseSuccess({ res });
    } else {
      return responseInValid({ res, message: "Can not find user " });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.DeleteUser = async (req, res) => {
  try {
    const user = await Users.findOneAndDelete({ userId: req.body.userId });
    if (user.photoURL) {
      const filePath = root + user.photoURL;
      removeDir({ dir: filePath });
    }
    return reponseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.ChangePassword = async (req, res) => {
  const { id } = req.decoded;
  try {
    const { newPassword, oldPassword, confirmPassword } = req.body;
    if (!newPassword || !oldPassword || !confirmPassword) {
      return responseInValid({ res, message: "Cần điền đầy đủ thông minh" });
    }
    const user = await Users.findOne({
      userId: id,
    });
    if (!user) return responseInValid({ res, message: "user not found" });
    const check = bcrypt.compareSync(oldPassword, user.password);
    if (!check) return responseInValid({ res, message: "Password incorrect" });
    if (newPassword !== confirmPassword)
      return responseInValid({ res, message: "New password not compare" });
    const hashPassword = await userServices.hashUserPassword(newPassword);
    user.password = hashPassword;
    await user.save();
    return reponseSuccess({ res });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
