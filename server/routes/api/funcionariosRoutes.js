const express = require('express');
const router = express.Router();

const {
  listarFuncionarios,
  pesquisarFuncionario,
  pequisarFuncionarioId,
  atualizarStatusFuncionario,
  criarFuncionario,
  atualizarFuncionario
} = require('../../controllers/funcionariosController');

// Listar todos os funcionários
router.get('/', listarFuncionarios);

//Pesquisar funcionario especifico pelo nome:
router.get('/pesquisar/:nome', pesquisarFuncionario)

//Pesquisar funcionario especifico pelo id
router.get('/id/:id', pequisarFuncionarioId)

// Criar novo funcionário
router.post('/', criarFuncionario);

// Atualizar status (ativo/inativo)
router.put('/:id', atualizarStatusFuncionario);

// Atualizar informações completas do funcionário
router.put('/editar/:id', atualizarFuncionario);

module.exports = router;
