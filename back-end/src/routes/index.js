const userRouter = require("./users.route");
const authRouter = require("./auth.route");
function initRoute(app) {
  app.use("/api/v1", userRouter);
  app.use("/api/v1/auth", authRouter);
}
module.exports = initRoute;
