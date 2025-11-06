const db = require('../config/db');

// loginController.js (trecho)
exports.loginUser = async (req, res) => {
  const { login, senha } = req.body;

  try {
    const [rows] = await db.query(
      'SELECT id_usuario, login, senha, ativo, perfil_id_cargos FROM usuarios WHERE login = ? AND senha = ? AND ativo = 1',
      [login, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    const user = rows[0];

    // Salva na sessão (o que você quiser expor)
    req.session.usuario = {
      id: user.id_usuario,
      login: user.login,
      perfil: user.perfil_id_cargos,
      ativo: user.ativo
    };

    return res.json({
      id: user.id_usuario,
      login: user.login,
      perfil: user.perfil_id_cargos,
      message: 'Login bem-sucedido'
    });

  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro no servidor' });
  }
};

exports.checkSession = (req, res) => {
  if (req.session && req.session.usuario) {
    res.json({
      logado: true,
      usuario: req.session.usuario
    });
  } else {
    res.json({
      logado: false
    });
  }
};
