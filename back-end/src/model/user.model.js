const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    displayName: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    photoURL: { type: String },
    isAdmin: { type: Boolean, default: false },
    favorite: { type: Array },
    // genToken: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);
const Users = mongoose.model("users", userSchema);
module.exports = Users;
