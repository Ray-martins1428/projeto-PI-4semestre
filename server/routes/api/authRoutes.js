const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Erro ao destruir sessao:', err);
      return res.status(500).json({ error: 'Erro ao deslogar' });
    }
    res.clearCookie('sessid'); // limpa cookie da sessão
    res.json({ message: 'Logout realizado' });
  });
});

module.exports = router;
