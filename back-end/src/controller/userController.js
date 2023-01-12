const Users = require("../model/user.model");
const userServices = require("../services/userServices");

const getUser = async (req, res) => {
  const user = await Users.findOne({ userId: req.body.userId });
  if (user) {
    console.log();
    return res.status(200).json(user);
  } else {
    return res.status(400).json({
      errCode: 1,
      message: "Can not find user",
    });
  }
};

const CreateNewUser = async (req, res) => {
  const message = await userServices.createUser(req.body);
  return res.status(200).json(message);
};

module.exports = {
  getUser,
  CreateNewUser,
};
