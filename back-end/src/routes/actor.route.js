const express = require("express");
const router = express.Router();
const actorController = require("../controller/actorController");

router.get("/getActor", actorController.getActor);
router.post("/createActor", actorController.addActor);
router.patch("/editActor", actorController.editActor);
router.delete("/deleteActor", actorController.deleteActor);
module.exports = router;
