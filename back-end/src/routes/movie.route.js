const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");
const movieController = require("../controller/movieController");
const Movie = require("../model/movie.model");
const {
  responseServerError,
  reponseSuccess,
  responseInValid,
  responseSuccessWithData,
} = require("../helper/ResponseRequests");
const { MOVIE_FOLDER } = require("../helper/constant");
const multer = require("multer");
const path = require("path");
const { removeDir } = require("../helper/file");
const root = path.resolve("./"); //E:\WorkSpace\back-end
const storagePoster = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, root + MOVIE_FOLDER);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
// const upload = multer({ storage: storagePoster }).single("poster");
// const mutipleUpload = multer({ storage: storagePoster }).array("videos", 10);
const uploadFile = multer({ storage: storagePoster }).fields([
  { name: "videos", maxCount: 1 },
  { name: "poster", maxCount: 1 },
  { name: "trailer", maxCount: 1 },
]);

router.get("/getMovieById", movieController.getMovieById);
//router.post("/createMovie", mutipleUpload, movieController.createMovie);
// router.patch("/updateMovieInfo", movieController.editMovie);
router.delete("/deleteMovie", movieController.deleteMovie);
router.delete("/deleteVideos", movieController.deleteVideos);

//---------------create movie -----------------------
router.post("/createMovie", async function (req, res) {
  try {
    uploadFile(req, res, async function (err) {
      if (err) {
        return responseServerError({ res, err: err.message });
      } else {
        const movieId = uuid();
        const pathPoster = req.files.poster
          ? MOVIE_FOLDER + req.files.poster[0].filename
          : null;
        const pathTrailer = req.files.trailer
          ? MOVIE_FOLDER + req.files.trailer[0].filename
          : null;
        let movies = req.files.videos;
        let pathMovies = [];
        if (movies) {
          pathMovies = movies.map((movie) => {
            return {
              video_path: MOVIE_FOLDER + movie.filename,
              title: req.body.pisode,
              duration: req.body.duration,
              pisode: req.body.pisode,
            };
          });
        }
        const movie = new Movie({
          ...req.body,
          movieId: movieId,
          poster: pathPoster,
          videos: pathMovies,
          trailer: pathTrailer,
        });
        if (movie) {
          await movie.save();
          return responseSuccessWithData({ res, data: movie });
        } else return responseInValid({ res, message: "movie invalid" });
        // console.log(root);
        // console.log(req.files.poster[0]);
      }
    });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
});
router.patch("/updateMovieInfo", async function (req, res) {
  try {
    uploadFile(req, res, async function (err) {
      if (err) {
        return responseServerError({ res, err: err.message });
      } else {
        const movie = await Movie.findOne({ movieId: req.body.movieId });
        const oldPosterPath = movie?.poster;
        const oldTrailerPath = movie?.trailer;
        let pathPoster;
        let pathTrailer;
        if (movie) {
          if (req.body.like && !movie.like.includes(req.body.like)) {
            movie.like.push(req.body.like);
          }
          if (req.body.dislike && !movie.dislike.includes(req.body.dislike)) {
            movie.dislike.push(req.body.dislike);
          }
        } else {
          //k co user nhung van upload file
          return responseInValid({ res, message: "movie not found" });
        }
        //poster
        if (movie.poster) {
          pathPoster = req.files?.poster
            ? MOVIE_FOLDER + req.files.poster[0].filename
            : movie.poster;
        } else {
          pathPoster = req.files?.poster
            ? MOVIE_FOLDER + req.files.poster[0].filename
            : null;
        }
        //trailer
        if (movie.trailer) {
          pathTrailer = req.files?.trailer
            ? MOVIE_FOLDER + req.files.trailer[0].filename
            : movie.trailer;
        } else {
          pathTrailer = req.files?.trailer
            ? MOVIE_FOLDER + req.files.trailer[0].filename
            : null;
        }
        const data = {
          ...req.body,
          like: movie.like,
          dislike: movie.dislike,
          poster: pathPoster,
          trailer: pathTrailer,
        };
        const movieUpdate = await Movie.findOneAndUpdate(
          { movieId: req.body.movieId },
          data,
          {
            new: true,
          }
        );
        if (movieUpdate) {
          if (oldPosterPath && req.files.poster) {
            removeDir({ dir: root + oldPosterPath });
          }
          if (oldTrailerPath && req.files.trailer) {
            removeDir({ dir: root + oldTrailerPath });
          }
          return responseSuccessWithData({ res, data: movieUpdate });
        } else {
          return responseInValid({ res, message: "movie not found" });
        }
      }
    });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
});

router.patch("/uploadVideosFile", async function (req, res) {
  try {
    uploadFile(req, res, async function (err) {
      if (err) {
        return responseServerError({ res, err: err.message });
      } else {
        const movie = await Movie.findOne({ movieId: req.body.movieId });
        let pathVideo;
        if (movie) {
          if (req.files.videos) {
            pathVideo = MOVIE_FOLDER + req.files.videos[0].filename;
            movie.videos.push({
              video_path: pathVideo,
              duration: req.body.duration,
              title: req.body.title,
              pisode: req.body.pisode,
            });
            const movieUpdate = await movie.save();
            if (movieUpdate) {
              return responseSuccessWithData({ res, data: movieUpdate });
            } else {
              return responseInValid({ res, message: "update fail" });
            }
          }
        } else {
          return responseInValid({ res, message: "movie not found" });
        }
      }
    });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
});

router.patch("/updateVideosFile", async function (req, res) {
  try {
    uploadFile(req, res, async function (err) {
      if (err) {
        return responseServerError({ res, err: err.message });
      } else {
        const movie = await Movie.findOne({ movieId: req.body.movieId });
        let pathVideo;
        let oldPathVideo;
        if (movie) {
          if (req.files.videos) {
            pathVideo = MOVIE_FOLDER + req.files.videos[0].filename;
          }
          movie.videos.forEach((video) => {
            if (video._id.toString() === req.body._id) {
              oldPathVideo = video.video_path;
              if (req.files.videos) {
                video.video_path = pathVideo;
              } else {
                video.video_path = oldPathVideo;
              }
              video.duration = req.body.duration;
              video.pisode = req.body.pisode;
              video.title = req.body.title;
            }
          });
          const movieUpdate = await movie.save();
          if (movieUpdate) {
            if (oldPathVideo && pathVideo) {
              removeDir({ dir: root + oldPathVideo });
            }
            return responseSuccessWithData({ res, data: movieUpdate });
          } else {
            return responseInValid({ res, message: "update movie failed" });
          }
        } else {
          return responseInValid({ res, message: "movie not found" });
        }
      }
    });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
});
module.exports = router;
