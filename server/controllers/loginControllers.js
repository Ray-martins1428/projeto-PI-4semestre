const db = require('../config/db');

exports.loginUser = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT * FROM usuarios WHERE login = ? AND senha = ? AND ativo = 1',
      [login, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    // posso gerar com jwt um token se quiser
    const user = rows[0];
    res.json({
      id: user.id_usuario,
      login: user.login,
      perfil: user.perfil_id_cargos,
      ativo: user.ativo,
      message: 'Login bem-sucedido'
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};
