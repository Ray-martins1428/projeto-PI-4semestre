const db = require("../config/db");

// =======================
// BUSCAR TODAS AS VENDAS
// =======================
exports.getVendas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        v.id_vendas,
        v.data_venda,
        v.qtd,
        v.vlr_total,
        p.nome AS produto,
        f.descricao AS forma_pagamento,
        CONCAT(cf.nome, ' ', cf.sobrenome) AS usuario
      FROM vendas v
      JOIN produtos p 
        ON v.produtos_id_produtos = p.id_produtos
      JOIN frm_pagamento f 
        ON v.frm_pagamento_id_frm_pagamento = f.id_frm_pagamento
      JOIN usuarios u 
        ON v.usuarios_id_usuario = u.id_usuario
      JOIN cadastro_funcionario cf 
        ON u.cadastro_funcionario_id_funcionario = cf.id_funcionario
      ORDER BY v.data_venda DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar vendas:", err);
    res.status(500).json({ error: "Erro ao buscar vendas" });
  }
};

// =======================
// BUSCAR TODAS AS COMPRAS
// =======================
exports.getCompras = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id_compra,
        c.data_compra,
        c.qtd,
        c.preco_custo,
        p.nome AS produto
      FROM compras c
      JOIN produtos p ON c.produtos_id_produtos = p.id_produtos
      ORDER BY c.data_compra DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar compras:", err);
    res.status(500).json({ error: "Erro ao buscar compras" });
  }
};

// =================================
// BUSCAR RESUMO PARA O DASHBOARD
// (totais de vendas, compras, lucro)
// =================================
exports.getResumo = async (req, res) => {
  try {
    const [[vendas]] = await db.query(`
      SELECT 
        COUNT(*) AS total_vendas,
        COALESCE(SUM(vlr_total), 0) AS soma_vendas
      FROM vendas
    `);

    const [[compras]] = await db.query(`
      SELECT 
        COUNT(*) AS total_compras,
        COALESCE(SUM(preco_custo * qtd), 0) AS soma_compras
      FROM compras
    `);

    const lucro = vendas.soma_vendas - compras.soma_compras;

    res.json({
      totalVendas: vendas.total_vendas,
      totalCompras: compras.total_compras,
      faturamento: vendas.soma_vendas,
      custo: compras.soma_compras,
      lucro
    });
  } catch (err) {
    console.error("Erro ao buscar resumo:", err);
    res.status(500).json({ error: "Erro ao buscar resumo" });
  }
};