const db = require('../config/db');


// LISTAR PRODUTOS-----LISTAR PRODUTOS-----LISTAR PRODUTOS-----LISTAR PRODUTOS-----LISTAR PRODUTOS-----LISTAR PRODUTOS-----
exports.listarProdutos = async (req, res) => {
  try {
    const [produtos] = await db.execute("SELECT * FROM produtos");
    res.render("estoque", { produtos });
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).send("Erro ao listar produtos");
  }
};


// CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----

exports.cadastrarProduto = async (req, res) => {
  const { nome, volume, valor, estoque_saldo } = req.body;

  if (!nome || !volume || !valor || !estoque_saldo) {
    return res.status(400).json({ error: "Campos obrigatórios não enviados" });
  }

  try {
    await db.execute(
      "INSERT INTO produtos (nome, volume, valor, estoque_saldo) VALUES (?, ?, ?, ?)",
      [nome, volume, valor, estoque_saldo]
    );

    res.status(201).json({ message: "Produto cadastrado" });

  } catch (err) {
    console.error("Erro ao cadastrar produto:", err);
    res.status(500).send("Erro ao cadastrar produto");
  }
};


// ATUALIZAR PRODUTO-----ATUALIZAR PRODUTO-----ATUALIZAR PRODUTO-----ATUALIZAR PRODUTO-----ATUALIZAR PRODUTO-----ATUALIZAR PRODUTO-----

exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { valor } = req.body;

  try {
    await db.execute(
      "UPDATE produtos SET valor=? WHERE id_produtos=?",
      [valor, id]
    );

    res.status(200).json({ message: "Produto atualizado" });

  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).send("Erro ao atualizar produto");
  }
};


// DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----

exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM produtos WHERE id_produtos=?", [id]);
    res.status(200).json({ message: "Produto deletado" });

  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).send("Erro ao deletar produto");
  }
};


// ADICIONAR ESTOQUE-----ADICIONAR ESTOQUE-----ADICIONAR ESTOQUE-----ADICIONAR ESTOQUE-----ADICIONAR ESTOQUE-----ADICIONAR ESTOQUE-----

exports.adicionarEstoque = async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  try {
    const [rows] = await db.execute(
      "SELECT estoque_saldo FROM produtos WHERE id_produtos=?",
      [id]
    );

    if (rows.length === 0) {
      console.log("Produto não encontrado!");
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const estoqueAtual = Number(rows[0].estoque_saldo);
    const qtdAdd = Number(quantidade);

    if (isNaN(estoqueAtual) || isNaN(qtdAdd)) {
      return res.status(400).json({ message: "Valor inválido" });
    }

    const novoEstoque = estoqueAtual + qtdAdd;

    await db.execute(
      "UPDATE produtos SET estoque_saldo=? WHERE id_produtos=?",
      [novoEstoque, id]
    );

    res.status(200).json({
      message: "Estoque atualizado com sucesso",
      novoEstoque
    });

  } catch (err) {
    console.error("Erro ao adicionar estoque:", err);
    res.status(500).send("Erro ao adicionar estoque");
  }
};
