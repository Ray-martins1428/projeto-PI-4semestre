const db = require("../config/db");

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
    await db.execute("UPDATE produtos SET valor=? WHERE id_produtos=?", [
      valor,
      id,
    ]);

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

// produtoController.js
exports.adicionarEstoque = async (req, res) => {
    try {
        const id_produto = req.params.id;
        const { quantidade, preco_custo } = req.body;

        if (!quantidade || quantidade <= 0) {
            return res.status(400).json({ erro: "Quantidade inválida!" });
        }

        if (!preco_custo || preco_custo <= 0) {
            return res.status(400).json({ erro: "Preço de custo inválido!" });
        }

        const sql = `
            INSERT INTO compras (data_compra, qtd, preco_custo, produtos_id_produtos)
            VALUES (CURDATE(), ?, ?, ?)
        `;

        const valores = [quantidade, preco_custo, id_produto];

        await db.execute(sql, valores);

        return res.status(200).json({ mensagem: "Estoque atualizado com sucesso!" });

    } catch (erro) {
        console.error("Erro ao adicionar estoque:", erro);
        res.status(500).json({ erro: "Erro interno ao adicionar estoque." });
    }
};




// Função interna para uso nas páginas EJS
exports.listarProdutosInterno = async () => {
  try {
    const [produtos] = await db.execute("SELECT * FROM produtos");
    return produtos; // retorna para a rota usar
  } catch (err) {
    console.error("Erro ao listar produtos internamente:", err);
    return []; // evita erro no EJS
  }
};
