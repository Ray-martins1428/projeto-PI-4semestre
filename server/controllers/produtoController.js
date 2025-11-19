const db = require('../config/db');

// --------------------------
// LISTAR PRODUTOS
// --------------------------
exports.listarProdutos = async (req, res) => {
  try {
    const [produtos] = await db.execute("SELECT * FROM produtos");
    res.render("estoque", { produtos });
  } catch (err) {
    console.error("Erro ao listar produtos:", err);
    res.status(500).send("Erro ao listar produtos");
  }
};

// --------------------------
// CADASTRAR PRODUTO
// --------------------------
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

// --------------------------
// ATUALIZAR PRODUTO
// --------------------------
exports.atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, volume, valor, estoque_saldo } = req.body;

  try {
    // Buscar o produto atual
    const [[produtoAtual]] = await db.execute(
      "SELECT * FROM produtos WHERE id_produtos=?",
      [id]
    );

    if (!produtoAtual) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }

    // Usar o valor existente quando o campo não foi enviado
    const novoNome = nome ?? produtoAtual.nome;
    const novoVolume = volume ?? produtoAtual.volume;
    const novoValor = valor ?? produtoAtual.valor;
    const novoSaldo = estoque_saldo ?? produtoAtual.estoque_saldo;

    await db.execute(
      "UPDATE produtos SET nome=?, volume=?, valor=?, estoque_saldo=? WHERE id_produtos=?",
      [novoNome, novoVolume, novoValor, novoSaldo, id]
    );

    res.status(200).json({ message: "Produto atualizado" });

  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).send("Erro ao atualizar produto");
  }
};

// --------------------------
// DELETAR PRODUTO
// --------------------------
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
