const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const db = require("./config/connectDB");
const initRoute = require("./routes/index");
var cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(cors({ credentials: true, origin: true }));
//connect db
db.connect();
app.use(express.static(path.join(__dirname, "public")));

//middleware middle
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(methodOverride("_method"));

//http logger
app.use(morgan("combined"));
//route init
initRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
