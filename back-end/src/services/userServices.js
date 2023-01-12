const Users = require("../model/user.model");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserName = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Users.findOne({ username: username });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserExist = await checkUserName(data.username);
      if (checkUserExist) {
        resolve({
          errCode: 1,
          message: "user already exists",
        });
      } else {
        const id = uuid();
        const hashPassword = await hashUserPassword(data.password);
        const user = new Users({ ...data, userId: id, password: hashPassword });
        await user.save();
        resolve({
          errCode: 0,
          message: "create user success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
};
