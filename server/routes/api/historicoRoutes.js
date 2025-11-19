const express = require('express');
const router = express.Router();
const historicoController = require("../../controllers/historicoController");


// Rota para listar o histórico de movimentações
router.get('/historico', historicoController.listarHistorico);

module.exports = router;