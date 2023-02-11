const userRouter = require("./users.route");
const authRouter = require("./auth.route");
const movieRouter = require("./movie.route");
function initRoute(app) {
  app.use("/api/v1", userRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/movie", movieRouter);
}
module.exports = initRoute;
