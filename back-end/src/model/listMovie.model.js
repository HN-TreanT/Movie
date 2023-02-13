const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListMovieSchema = new Schema(
  {
    listId: { type: String, unique: true, required: true },
    type: { type: String, default: null },
    movies: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const ListMovie = mongoose.model("ListMovie", ListMovieSchema);
module.exports = ListMovie;
