const db = require('../config/db'); // Conexão com o banco

// Listar o histórico de movimentações de estoque
exports.listarHistorico = async (req, res) => {
  try {
    const [historico] = await db.execute(
      'SELECT h.*, p.nome, u.login FROM historico_estoque h JOIN produtos p ON p.id_produtos = h.id_produto JOIN usuarios u ON u.id_usuario = h.id_usuario ORDER BY h.data_movimentacao DESC'
    );
    res.render('historico', { historico });
  } catch (error) {
    console.error('Erro ao listar histórico:', error);
    res.status(500).send('Erro ao listar histórico');
  }
};