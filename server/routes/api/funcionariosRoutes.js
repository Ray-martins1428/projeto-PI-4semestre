const express = require('express');
const router = express.Router();

const {
  listarFuncionarios,
  atualizarStatusFuncionario,
  criarFuncionario
} = require('../../controllers/funcionariosController');

// Listar todos os funcionários
router.get('/', listarFuncionarios);

// Criar novo funcionário
router.post('/', criarFuncionario);

// Atualizar status (ativo/inativo)
router.put('/:id', atualizarStatusFuncionario);

module.exports = router;
