const db = require("../config/db");

module.exports = {

    // ===============================
    // CARREGAR PRODUTOS
    // ===============================
    async carregarProdutos(req, res) {
        try {
            const [produtos] = await db.execute("SELECT * FROM produtos");
            res.json(produtos);
        } catch (err) {
            console.error("Erro ao carregar produtos:", err);
            res.status(500).json({ erro: "Erro ao carregar produtos" });
        }
    },

    // ===============================
    // REGISTRAR NOVA VENDA
    // ===============================
    async novaVenda(req, res) {
        try {
            const {
                id_produto,
                quantidade,
                forma_pagamento,
                preco_unitario,
                preco_total,
                id_usuario
            } = req.body;

            // Validações básicas
            if (!id_produto || !quantidade || !forma_pagamento) {
                return res.status(400).json({ erro: "Dados incompletos." });
            }

            // Converter forma de pagamento para número
            const formaPag = Number(forma_pagamento);
            if (isNaN(formaPag)) {
                return res.status(400).json({ erro: "Forma de pagamento inválida." });
            }

            // Buscar produto no banco
            const [rows] = await db.execute(
                "SELECT nome, valor, estoque_saldo FROM produtos WHERE id_produtos = ?",
                [id_produto]
            );

            if (rows.length === 0) {
                return res.status(400).json({ erro: "Produto não encontrado." });
            }

            const produto = rows[0];

            // Bloquear se estoque zerado
            if (produto.estoque_saldo === 0) {
                return res.status(400).json({
                    erro: `O produto '${produto.nome}' está com estoque zerado.`
                });
            }

            // Bloquear se quantidade solicitada > estoque
            if (quantidade > produto.estoque_saldo) {
                return res.status(400).json({
                    erro: `Estoque insuficiente para '${produto.nome}'. Disponível: ${produto.estoque_saldo}, Solicitado: ${quantidade}.`
                });
            }

            // Calcular total da venda em JS
            const totalVenda = Number(preco_unitario) * Number(quantidade);
            if (totalVenda <= 0) {
                return res.status(400).json({ erro: "Valor total da venda inválido." });
            }

            // ===============================
            // INSERIR VENDA NO BANCO
            // ===============================
            const sql = `
                INSERT INTO vendas (
                    data_venda, qtd, vlr_total,
                    produtos_id_produtos, frm_pagamento_id_frm_pagamento,
                    usuarios_id_usuario
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            const params = [
                new Date(),     // data_venda
                quantidade,     // qtd
                totalVenda,     // vlr_total
                id_produto,     // produtos_id_produtos
                formaPag,       // frm_pagamento_id_frm_pagamento
                id_usuario      // usuarios_id_usuario
            ];

            const [result] = await db.execute(sql, params);

            // ===============================
            // ATUALIZAR ESTOQUE - apenas uma vez
            // ===============================
            await db.execute("CALL saida_estoque(?, ?)", [id_produto, quantidade]);

            // Resposta de sucesso
            res.json({
                mensagem: "Venda registrada com sucesso!",
                id_venda: result.insertId
            });

        } catch (err) {
            console.error("Erro no registro da venda:", err);
            res.status(500).json({ erro: err.message });
        }
    }
};