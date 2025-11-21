const db = require("../config/db");

// -------------------------------------------
// EXTRAI VALOR DE UM CAMPO DENTRO DE "valores"
// -------------------------------------------
function extrairCampo(texto, campo) {
  const regex = new RegExp(`${campo}=\\s*([^,]+)`);
  const match = texto.match(regex);
  return match ? match[1].trim() : null;
}

// -------------------------------------------
// BUSCAR HISTÓRICO COMPLETO
// -------------------------------------------
exports.getHistorico = async (req, res) => {
  try {
    const [logs] = await db.query(`
      SELECT id, operacao, tabela, usuario, valores, data
      FROM logs_sistema
      ORDER BY data DESC
    `);

    const historicoFinal = [];

    for (const log of logs) {
      const txt = log.valores || "";

      // Extrair dados do texto
      const idProdutoMatch = txt.match(/(?:id_produtos|produtos_id_produtos)\s*=\s*(\d+)/);
      const qtdMatch = txt.match(/qtd\s*=\s*(\d+(?:\.\d+)?)/);

      const idProduto = idProdutoMatch ? idProdutoMatch[1] : null;
      const qtd = qtdMatch ? qtdMatch[1] : "-";

      // Buscar nome do produto
      let produtoNome = "-";
      if (idProduto) {
        const [[produto]] = await db.query(
          "SELECT nome FROM produtos WHERE id_produtos = ?",
          [idProduto]
        );
        if (produto) produtoNome = produto.nome;
      }

      historicoFinal.push({
        id: log.id,
        tipo: log.tabela === "vendas" ? "VENDA" : "COMPRA",
        produto: produtoNome,
        qtd: qtd,
        data: new Date(log.data).toLocaleString("pt-BR")
      });
    }

    res.json(historicoFinal);

  } catch (err) {
    console.error("Erro ao buscar histórico:", err);
    res.status(500).json({ error: "Erro ao buscar histórico" });
  }
};
