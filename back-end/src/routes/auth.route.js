const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
router.post("/login", authController.Login);
router.post("/refresh", authController.RefreshToken);

module.exports = router;
