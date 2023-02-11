const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
const db = require("./config/connectDB");
const initRoute = require("./routes/index");
var cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(cors({ credentials: true, origin: true }));
//connect db
app.use("/public", express.static(path.join(__dirname, "../public")));
db.connect();

//middleware middle
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//http logger
app.use(morgan("combined"));
//route init
initRoute(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
