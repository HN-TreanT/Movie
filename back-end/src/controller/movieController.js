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
const ListMovie = require("../model/listMovie.model");
const console = require("console");
const root = path.resolve("./");
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieId: req.query.movieId });
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
    ListMovie.updateMany(
      {
        movies: req.body.movieId,
      },
      {
        $pull: {
          movies: req.body.movieId,
        },
      },
      function (err) {
        if (err) return console.error(err);
        console.log("MovieId deleted from the lists");
      }
    );
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
exports.getAllMovie = async (req, res) => {
  try {
    const movies = await Movie.find();
    if (movies.length > 0) {
      return responseSuccessWithData({ res, data: movies });
    } else {
      return responseInValid({ res, message: "not movie" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};

exports.searchMoive = async (req, res) => {
  try {
    let movies = [];
    if (req.query.category) {
      movies = await Movie.find({
        category: new RegExp(req.query.category.toString(), "i"),
      });
    }
    if (req.query.actor) {
      movies = await Movie.find({
        actor: new RegExp(req.query.actor.toString(), "i"),
      });
    }
    if (req.query.director) {
      movies = await Movie.find({
        directors: new RegExp(req.query.director.toString(), "i"),
      });
    }
    if (req.query.name) {
      movies = await Movie.find({
        title: new RegExp(req.query.name.toString(), "i"),
      });
    }
    if (movies.length > 0) {
      return responseSuccessWithData({ res, data: movies });
    } else {
      return responseInValid({ res, message: "Not found movie" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.getMovieRandom = async (req, res) => {
  try {
    const numberOfMovies = req.query.random;
    let randomMovies = [];
    const movies = await Movie.find();
    if (movies) {
      for (let i = 0; i < numberOfMovies; i++) {
        const ramdomIndex = Math.floor(Math.random() * movies.length);
        randomMovies.push(movies[ramdomIndex]);
      }
      return responseSuccessWithData({ res, data: randomMovies });
    } else {
      return responseInValid({ res, message: "not moive" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
