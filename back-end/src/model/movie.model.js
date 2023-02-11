const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema(
  {
    movieId: { type: String, required: true, unique: true },
    title: { type: String, default: null },
    description: { type: String, default: null },
    view: { type: Number, default: 0 },
    like: [{ type: String }],
    dislike: [{ type: String }],
    year: { type: Number, default: null },
    category: { type: String, default: null },
    poster: { type: String, default: null }, // image
    isSeries: { type: Boolean, default: false },
    videos: [
      {
        video_path: { type: String, default: null },
        title: { type: String, default: "title" },
        duration: { type: String, default: 0 },
        pisode: { type: Number, default: 0 },
      },
    ],
    time: { type: Number, default: null },
    trailer: { type: String, default: null },
    actor: { type: String, default: null },
    directors: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose.model("movies", movieSchema);
module.exports = Movie;
