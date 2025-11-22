const db = require("../config/db");

// Construir filtros de data
function construirFiltroData(query) {
  const filtros = [];
  const valores = [];

  if (query.ano) {
    filtros.push("YEAR(v.data_venda) = ?");
    valores.push(query.ano);
  }
  if (query.mes) {
    filtros.push("MONTH(v.data_venda) = ?");
    valores.push(query.mes);
  }
  if (query.dia) {
    filtros.push("DAY(v.data_venda) = ?");
    valores.push(query.dia);
  }

  return {
    where: filtros.length > 0 ? "WHERE " + filtros.join(" AND ") : "",
    valores
  };
}

// Buscar vendas (com filtro)
exports.getVendas = async (req, res) => {
  try {
    const { where, valores } = construirFiltroData(req.query);

    const [rows] = await db.query(`
      SELECT 
        v.id_vendas,
        v.data_venda,
        v.qtd,
        v.vlr_total,
        p.nome AS produto,
        f.descricao AS forma_pagamento,
        CONCAT(cf.nome, ' ', cf.sobrenome) AS usuario,
        p.preco_custo
      FROM vendas v
      JOIN produtos p ON v.produtos_id_produtos = p.id_produtos
      JOIN frm_pagamento f ON v.frm_pagamento_id_frm_pagamento = f.id_frm_pagamento
      JOIN usuarios u ON v.usuarios_id_usuario = u.id_usuario
      JOIN cadastro_funcionario cf ON u.cadastro_funcionario_id_funcionario = cf.id_funcionario
      ${where}
      ORDER BY v.data_venda DESC
    `, valores);

    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
};

// Resumo do dashboard
exports.getResumo = async (req, res) => {
  try {
    const { where, valores } = construirFiltroData(req.query);

    // Total de vendas e faturamento
    const [[vendas]] = await db.query(`
      SELECT COUNT(*) AS total_vendas, COALESCE(SUM(v.vlr_total),0) AS faturamento
      FROM vendas v
      ${where}
    `, valores);

    // Custo real dos produtos vendidos
    const [[custo]] = await db.query(`
      SELECT COALESCE(SUM(p.preco_custo * v.qtd),0) AS custo
      FROM vendas v
      JOIN produtos p ON v.produtos_id_produtos = p.id_produtos
      ${where}
    `, valores);

    const lucro = Number(vendas.faturamento) - Number(custo.custo);

    res.json({
      totalVendas: vendas.total_vendas,
      faturamento: Number(vendas.faturamento.toFixed(2)),
      custo: Number(custo.custo.toFixed(2)),
      lucro: Number(lucro.toFixed(2))
    });

  } catch (err) {
    console.error("Erro ao buscar resumo:", err);
    res.status(500).json({ error: "Erro ao buscar resumo" });
  }
};
