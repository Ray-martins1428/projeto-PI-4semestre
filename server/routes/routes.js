const express = require('express');
const router = express.Router();

// 
router.post('/login', (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === "admin" && senha === "senha123") {
        res.redirect('/dashboard');
    } else {
        res.redirect('/?error=1');
    }
});

// Rota GET para a Dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Rota GET para a página de estoque
router.get('/estoque', (req, res) => {
    res.render('estoque');
});

// Rota GET para a página de funcionários
router.get('/funcionarios', (req, res) => {
    res.render('funcionarios');
});


module.exports = router;