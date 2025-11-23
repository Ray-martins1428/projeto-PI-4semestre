const express = require('express');
const router = express.Router();
const db = require("../../config/db");
const produtoController = require("../../controllers/produtoController");

// ROTA JSON (API)
router.get("/estoque", async (req, res) => {
    try {
        const [produtos] = await db.execute("SELECT * FROM produtos");
        res.json(produtos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao listar produtos" });
    }
});

router.post("/produto", produtoController.cadastrarProduto);
router.put("/produto/:id", produtoController.atualizarProduto);
router.delete("/produto/:id", produtoController.deletarProduto);
router.post("/produto/adicionar-estoque/:id", produtoController.adicionarEstoque);
console.log("Rota POST /api/produtos/adicionar-estoque/:id registrada");

module.exports = router;
