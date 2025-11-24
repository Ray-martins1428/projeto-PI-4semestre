const express = require("express");
const router = express.Router();
const vendaController = require("../../controllers/vendaController");

// LISTAR PRODUTOS
router.get("/produtos", vendaController.carregarProdutos);

// NOVA VENDA
router.post("/nova", vendaController.novaVenda);

module.exports = router;
