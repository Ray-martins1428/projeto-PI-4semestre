const express = require("express");
const router = express.Router();
const dashboardController = require("../../controllers/dashboardController");

// ROTAS DO DASHBOARD
router.get("/vendas", dashboardController.getVendas);
router.get("/compras", dashboardController.getCompras);
router.get("/resumo", dashboardController.getResumo);

module.exports = router;
