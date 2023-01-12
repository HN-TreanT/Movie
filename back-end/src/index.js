const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
//connect db

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
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
