const express = require("express");
const router = express.Router();
const loginController = require("../../controllers/loginControllers");

router.post("/login", loginController.loginUser);
router.get("/session", loginController.checkSession);

module.exports = router;
