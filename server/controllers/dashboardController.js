const db = require("../config/db");
const PDFDocument = require("pdfkit");

// ======================================================================
// DASHBOARD SUMMARY
// ======================================================================
exports.getSummary = async (req, res) => {
  try {
    // RANGE REAL DO BANCO
    const [range] = await db.query(`
      SELECT 
        MIN(data_venda) AS minData,
        MAX(data_venda) AS maxData
      FROM vendas
    `);

    const start = req.query.start || range[0].minData;
    const end = req.query.end || range[0].maxData;

    console.log("📌 Filtro:", start, "->", end);

    // MÉTRICAS
    const [metrics] = await db.query(
      `
      SELECT
        COUNT(*) AS transactions,
        IFNULL(SUM(v.qtd), 0) AS items_sold,
        IFNULL(SUM(v.vlr_total), 0) AS faturamento
      FROM vendas v
      WHERE v.data_venda BETWEEN ? AND ?
      `,
      [start, end]
    );

    const transactions = metrics[0].transactions;
    const items_sold = Number(metrics[0].items_sold);
    const faturamento = Number(metrics[0].faturamento);

    // CUSTO
    const [custoRows] = await db.query(
      `
      SELECT 
        SUM(
          v.qtd * (
            SELECT IFNULL(AVG(c.preco_custo), 0)
            FROM compras c
            WHERE c.produtos_id_produtos = v.produtos_id_produtos
          )
        ) AS custo_total
      FROM vendas v
      WHERE v.data_venda BETWEEN ? AND ?
      `,
      [start, end]
    );

    const custo = Number(custoRows[0].custo_total || 0);
    const lucro = faturamento - custo;

    // ÚLTIMAS VENDAS
    const [latest] = await db.query(
      `
      SELECT 
        v.id_vendas,
        DATE_FORMAT(v.data_venda, "%d/%m/%Y") AS data_venda,
        v.qtd,
        v.vlr_total,
        (v.vlr_total / NULLIF(v.qtd,0)) AS valor_unitario,
        p.nome AS produto_nome
      FROM vendas v
      INNER JOIN produtos p ON p.id_produtos = v.produtos_id_produtos
      WHERE v.data_venda BETWEEN ? AND ?
      ORDER BY v.data_venda DESC, v.id_vendas DESC
      LIMIT 50
      `,
      [start, end]
    );

    // GRÁFICO LINHA
    const [chartRows] = await db.query(
      `
      SELECT 
        DATE_FORMAT(v.data_venda, "%d/%m/%Y") AS dia,
        SUM(v.vlr_total) AS faturamento
      FROM vendas v
      WHERE v.data_venda BETWEEN ? AND ?
      GROUP BY v.data_venda
      ORDER BY v.data_venda ASC
      `,
      [start, end]
    );

    // GRÁFICO PIZZA
    const [prodRows] = await db.query(
      `
      SELECT 
        p.nome AS produto,
        SUM(v.qtd) AS total
      FROM vendas v
      INNER JOIN produtos p ON p.id_produtos = v.produtos_id_produtos
      WHERE v.data_venda BETWEEN ? AND ?
      GROUP BY p.nome
      ORDER BY total DESC
      `,
      [start, end]
    );

    return res.json({
      transactions,
      items_sold,
      faturamento: faturamento.toFixed(2),
      custo: custo.toFixed(2),
      lucro: lucro.toFixed(2),
      latestSales: latest,
      chart: chartRows,
      produtosVendidos: prodRows
    });

  } catch (err) {
    console.error("🔥 ERRO NO DASHBOARD:", err);
    res.status(500).json({ error: "Erro no dashboard", detalhes: err.message });
  }
};

// ======================================================================
// GERAR PDF
// ======================================================================
exports.generatePDF = async (req, res) => {
  try {
    const start = req.query.start || "1970-01-01";
    const end = req.query.end || "9999-12-31";

    // MÉTRICAS
    const [metrics] = await db.query(
      `
      SELECT
        COUNT(*) AS transactions,
        IFNULL(SUM(v.qtd), 0) AS items_sold,
        IFNULL(SUM(v.vlr_total), 0) AS faturamento
      FROM vendas v
      WHERE v.data_venda BETWEEN ? AND ?
      `,
      [start, end]
    );

    const [latest] = await db.query(
      `
      SELECT 
        v.id_vendas,
        DATE_FORMAT(v.data_venda, "%d/%m/%Y") AS data_venda,
        v.qtd,
        v.vlr_total,
        (v.vlr_total / NULLIF(v.qtd,0)) AS valor_unitario,
        p.nome AS produto_nome
      FROM vendas v
      INNER JOIN produtos p ON p.id_produtos = v.produtos_id_produtos
      WHERE data_venda BETWEEN ? AND ?
      ORDER BY v.data_venda DESC
      LIMIT 30
      `,
      [start, end]
    );

    // PDF
    const doc = new PDFDocument({ margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=relatorio-vendas.pdf");

    doc.pipe(res);

    doc.fontSize(20).text("Relatório de Vendas - Ultragaz", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Período: ${start} até ${end}`);
    doc.moveDown(2);

    doc.fontSize(14).text(`Transações: ${metrics[0].transactions}`);
    doc.text(`Itens vendidos: ${metrics[0].items_sold}`);
    doc.text(`Faturamento: R$ ${metrics[0].faturamento.toFixed(2)}`);
    doc.moveDown();

    doc.fontSize(16).text("Últimas Vendas:", { underline: true });
    doc.moveDown();

    doc.fontSize(12);
    latest.forEach(v => {
      doc.text(
        `#${v.id_vendas} | ${v.data_venda} | ${v.produto_nome} | Qtd: ${v.qtd} | Unit: R$ ${v.valor_unitario.toFixed(2)} | Total: R$ ${v.vlr_total.toFixed(2)}`
      );
    });

    doc.end();

  } catch (err) {
    console.error("ERRO PDF:", err);
    res.status(500).json({ error: "Erro ao gerar PDF" });
  }
};
