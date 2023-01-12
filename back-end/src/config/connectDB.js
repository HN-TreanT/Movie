const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/movie");
    console.log("connect succeeded");
  } catch (e) {
    console.log("connect fail");
  }
}

module.exports = { connect };
