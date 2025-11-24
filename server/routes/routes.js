const express = require('express');
const router = express.Router();
const db = require("../config/db");

// LOGIN
router.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === "admin" && senha === "senha123") {
        res.redirect('/dashboard');
    } else {
        res.redirect('/?error=1');
    }
});

// Página Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Página Funcionários
router.get('/funcionarios', (req, res) => {
    res.render('funcionarios');
});

// Criar funcionário
router.get('/cria-func', (req, res) => {
  res.render('cria-func');
});

// Página Estoque (EJS)
router.get('/estoque', async (req, res) => {
    try {
        const [produtos] = await db.execute("SELECT * FROM produtos");
        res.render('estoque', { produtos });
    } catch (err) {
        res.render('estoque', { produtos: [] });
    }
});

// Página Histórico
router.get('/historico', (req, res) => {
    res.render('historico');
});


// Página de Vendas 

router.get('/venda', async (req, res) => {
    try {
        const [produtos] = await db.execute("SELECT * FROM produtos");
        res.render("venda", { produtos });
    } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        res.render("venda", { produtos: [] });
    }
});

module.exports = router;
