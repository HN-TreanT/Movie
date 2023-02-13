const userRouter = require("./users.route");
const authRouter = require("./auth.route");
const movieRouter = require("./movie.route");
const listMovieRouter = require("./listMovie.route");
const actorRouter = require("./actor.route");
function initRoute(app) {
  app.use("/api/v1", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/movie", movieRouter);
  app.use("/api/v1/listMovie", listMovieRouter);
  app.use("/api/v1/actor", actorRouter);
}
module.exports = initRoute;
