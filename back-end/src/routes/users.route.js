const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const validateToken = require("../middleware/validateToken");

router.get("/getAllUser", userController.getAllUsers);
router.get("/getUser", validateToken, userController.getUser);
router.post("/signup", userController.SignUp);
router.patch("/editUser", validateToken, userController.EditUser);
router.delete("/deleteUser", userController.DeleteUser);
router.patch("/changePassword", validateToken, userController.ChangePassword);
router.get("/searchUser", userController.SearchUser);
module.exports = router;
