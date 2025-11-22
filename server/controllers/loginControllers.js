const db = require('../config/db');
const bcrypt = require('bcrypt');

// loginController.js (trecho)
exports.loginUser = async (req, res) => {
  const { login, senha } = req.body

  try {
    const [rows] = await db.query(
      'SELECT id_usuario, login, senha, ativo, perfil_id_cargos FROM usuarios WHERE login = ? AND ativo = 1',
      [login]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }

    const user = rows[0];
    const senhaArmazenada = user.senha;

    // Verifica se a senha armazenada é um hash bcrypt
    const isBcryptHash = senhaArmazenada.startsWith('$2b$') || senhaArmazenada.startsWith('$2a$');

    let senhaValida = false;

    if (isBcryptHash) {
      senhaValida = await bcrypt.compare(senha, senhaArmazenada);
    } else {
      senhaValida = (senha === senhaArmazenada);

      if (senhaValida) {
        try {
          const senhaCriptografada = await bcrypt.hash(senha, 12);
          await db.query(
            `
              UPDATE usuarios SET senha = ? where id_usuario = ?
            `,
            [senhaCriptografada, user.id_usuario]
          );
          console.log(`Senha migrada para Bcrypt - usuario: ${user.login}`);
        } catch (migrateError) {
          console.error(`Erro ao migrar senha para Bcrypt: `, migrateError);
        }
      }
    }

    if (!senhaValida) {
      return res.status(401).json({ message: 'Usuário ou senha incorretos' });
    }


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
