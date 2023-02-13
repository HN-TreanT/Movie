const ListMovie = require("../model/listMovie.model");
const Movie = require("../model/movie.model");
const { v4: uuid } = require("uuid");
const {
  reponseSuccess,
  responseInValid,
  responseServerError,
  responseSuccessWithData,
} = require("../helper/ResponseRequests");

exports.getListMovie = async (req, res) => {
  try {
    ListMovie.aggregate([
      {
        $match: {
          type: `${req.query.type}`,
        },
      },
      {
        $lookup: {
          from: "movies", //tên collection join
          localField: "movies", // tên trường trong collection listMovie để join
          foreignField: "movieId", //trường trong collection movies để join
          as: "movies_info",
        },
      },
      {
        $unwind: "$movies_info",
      },
    ]).exec(function (err, listMovie) {
      if (err) {
        return responseServerError({ res, err: err.message });
      } else {
        if (listMovie.length > 0) {
          return responseSuccessWithData({ res, data: listMovie });
        } else {
          return responseInValid({
            res,
            message: `Not found movie in listMovie,type:${req.body.type}`,
          });
        }
      }
    });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.createListMovie = async (req, res) => {
  try {
    const listId = uuid();
    const listMovie = new ListMovie({
      listId: listId,
      type: req.body.type,
    });
    await listMovie.save();
    return responseSuccessWithData({ res, data: listMovie });
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.addMovieToList = async (req, res) => {
  try {
    const listMovie = await ListMovie.findOne({ type: req.body.type });
    if (listMovie) {
      const listMovieId = listMovie.movies.filter(
        (movieId) => movieId === req.body.movieId
      );
      if (listMovieId.length > 0) {
        return responseInValid({ res, message: "movieId exist" });
      } else {
        listMovie.movies.push(req.body.movieId);
        const list = await listMovie.save();
        return responseSuccessWithData({ res, data: list });
      }
    } else {
      return responseInValid({ res, message: "not found listMovie" });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
exports.deleteListMovie = async (req, res) => {
  try {
    const list = await ListMovie.findOneAndDelete({ listId: req.body.listId });
    if (list) {
      return reponseSuccess({ res });
    } else {
      return responseInValid({ res, message: "not found list " });
    }
  } catch (err) {
    return responseServerError({ res, err: err.message });
  }
};
