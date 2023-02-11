const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    displayName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    photoURL: { type: String, default: null },
    isAdmin: { type: Boolean, default: false },
    favorite: { type: Array },
    refreshToken: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
