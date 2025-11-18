const db = require('../config/db');

// LISTAR
exports.listarProdutos = async (req, res) => {
  try {
    const [produtos] = await db.execute("SELECT * FROM produtos");
    res.render("estoque", { produtos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao listar produtos");
  }
};

// CADASTRAR
exports.cadastrarProduto = async (req, res) => {
  const { nome, volume, valor, estoque_saldo } = req.body;

  try {
    await db.execute(
      "INSERT INTO produtos (nome, volume, valor, estoque_saldo) VALUES (?, ?, ?, ?)",
      [nome, volume, valor, estoque_saldo]
    );

    res.status(200).json({ message: "Produto cadastrado" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao cadastrar produto");
  }
};

// EDITAR
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, volume, valor, estoque_saldo } = req.body;

  try {
    await db.execute(
      "UPDATE produtos SET nome=?, volume=?, valor=?, estoque_saldo=? WHERE id_produtos=?",
      [nome, volume, valor, estoque_saldo, id]
    );

    res.status(200).json({ message: "Atualizado" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar produto");
  }
};

// DELETAR
exports.deletarProduto = async (req, res) => {
  const { id } = req.params;

  try {
    await db.execute("DELETE FROM produtos WHERE id_produtos=?", [id]);
    res.status(200).json({ message: "Deletado" });

  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao deletar produto");
  }
};
