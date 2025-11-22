const express = require("express");
const router = express.Router();

const dashboardController = require("../../controllers/dashboardController");

router.get("/summary", dashboardController.getSummary);
router.get("/pdf", dashboardController.generatePDF);

module.exports = router;
