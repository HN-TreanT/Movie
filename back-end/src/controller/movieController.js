const Movie = require("../model/movie.model");
const { v4: uuid } = require("uuid");
const {
  responseSuccessWithData,
  responseInValid,
  responseServerError,
  reponseSuccess,
} = require("../helper/ResponseRequests");
const { removeDir } = require("../helper/file");
const path = require("path");
const root = path.resolve("./");
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieId: req.body.movieId });
    if (movie) {
      return responseSuccessWithData({ res, data: movie });
    } else {
      return responseInValid({ res, message: "Movie not found" });
    }
  } catch (e) {
    return responseServerError({ res, err: e.message });
  }
};
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOneAndDelete({ movieId: req.body.movieId });
    if (movie) {
      if (movie.poster) {
        removeDir({ dir: root + movie.poster });
      }
      if (movie.trailer) {
        removeDir({ dir: root + movie.trailer });
      }
      if (movie.videos.length > 0) {
        movie.videos.forEach((path) => {
          removeDir({ dir: root + path });
        });
      }

      return reponseSuccess({ res });
    } else {
      return responseInValid({ res, message: "Movie not found" });
    }
  } catch (e) {
    return responseServerError({ res, err: e.message });
  }
};

exports.deleteVideos = async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieId: req.body.movieId });
    if (movie) {
      const indexVideo = movie.videos.findIndex(
        (video) => video._id.toString() === req.body._id
      );
      const pathVideoOld = root + movie.videos[indexVideo].video_path;
      if (indexVideo == -1) {
        return responseInValid({ res, message: "video not found" });
      } else {
        movie.videos.splice(indexVideo, 1);
        const message = await movie.save();
        if (message) {
          removeDir({
            dir: pathVideoOld,
          });
          return reponseSuccess({ res });
        } else {
          return responseInValid({ res, message: "error saving movie" });
        }
      }
    } else {
      return responseInValid({ res, message: "Movie not found" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
