const express = require("express");
const router = express.Router();
const listMovieController = require("../controller/listMovieController");

router.get("/getListMovie", listMovieController.getListMovie);
router.post("/createList", listMovieController.createListMovie);
router.patch("/addMovieToList", listMovieController.addMovieToList);
router.delete("/deleteList", listMovieController.deleteListMovie);
module.exports = router;
