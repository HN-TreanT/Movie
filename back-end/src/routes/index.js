const userRouter = require("./users.route");

function initRoute(app) {
  app.use("/api/v1", userRouter);
}
module.exports = initRoute;
