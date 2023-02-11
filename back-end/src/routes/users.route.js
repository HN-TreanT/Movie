const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validateToken = require("../middleware/validateToken");
const { AVARTAR_FOLDER } = require("../helper/constant");
//const root = require("app-root-path");
const multer = require("multer");
const path = require("path");
const root = path.resolve("./");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, root + AVARTAR_FOLDER);
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.get("/getAllUser", userController.getAllUsers);
router.get("/getUser", validateToken, userController.getUser);
router.post("/signup", userController.SignUp);
router.patch(
  "/editUser",
  validateToken,
  upload.single("photoURL"),
  userController.EditUser
);
router.delete("/deleteUser", userController.DeleteUser);
router.patch("/changePassword", validateToken, userController.ChangePassword);
router.get("/searchUser", userController.SearchUser);
module.exports = router;
