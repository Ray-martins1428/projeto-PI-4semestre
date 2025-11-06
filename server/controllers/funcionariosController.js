const db = require('../config/db');

// ========================
// LISTAR FUNCIONÁRIOS
// ========================
exports.listarFuncionarios = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        f.id_funcionario,
        f.nome,
        f.sobrenome,
        f.RG,
        f.CPF,
        f.celular,
        f.telefone,
        IFNULL(p.nome, '') AS perfil_nome,
        IFNULL(u.ativo, 0) AS ativo
      FROM cadastro_funcionario f
      LEFT JOIN usuarios u ON f.id_funcionario = u.cadastro_funcionario_id_funcionario
      LEFT JOIN perfil p ON u.perfil_id_cargos = p.id_cargos
      ORDER BY f.id_funcionario;
    `);

    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar funcionários:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

// ========================
// ATUALIZAR STATUS (Ativo/Inativo)
// ========================
exports.atualizarStatusFuncionario = async (req, res) => {
  const { id } = req.params;
  const { ativo } = req.body;

  try {
    await db.query(
      'UPDATE usuarios SET ativo = ? WHERE cadastro_funcionario_id_funcionario = ?',
      [ativo, id]
    );
    res.json({ message: 'Status atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar status:', err);
    res.status(500).json({ error: 'Erro ao atualizar status do funcionário' });
  }
};

// CRIAR FUNCIONÁRIO + USUÁRIO AUTOMÁTICO (gera login e senha conforme pedido)
exports.criarFuncionario = async (req, res) => {
  const { nome, sobrenome, RG, CPF, celular, telefone, data_nascimento } = req.body;

  try {
    // 1) Inserir funcionário (inclui DATA_NASCIMENTO)
    const [resultado] = await db.query(
      `INSERT INTO cadastro_funcionario 
        (nome, sobrenome, RG, CPF, celular, telefone, DATA_NASCIMENTO)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, sobrenome, RG || null, CPF || null, celular || null, telefone || null, data_nascimento || '1990-12-31']
    );

    const idFuncionario = resultado.insertId;

    // 2) Gerar login no formato: primeiroNome.ultimoSobrenome
    // juntar nome + sobrenome caso sobrenome venha separado (seu front já manda nome e sobrenome separados)
    // Mas vamos extrair primeiro nome / último sobrenome de forma robusta caso sobrenome contenha espaços.
    const primeiro = (nome || '').trim().split(/\s+/)[0] || 'user';
    // pegar o último word do sobrenome (se vazio, tenta do nome)
    const ultimo = (sobrenome || '').trim().split(/\s+/).filter(Boolean).slice(-1)[0] 
                   || ( (nome||'').trim().split(/\s+/).slice(-1)[0] ) 
                   || 'usuario';

    // função para normalizar (remover acentos e espaços, deixar minúsculo)
    const normalize = (str) => {
      return str
        .normalize('NFD')               // separa diacríticos
        .replace(/[\u0300-\u036f]/g, '')// remove diacríticos
        .replace(/[^a-zA-Z0-9]/g, '')   // deixa só alfanuméricos
        .toLowerCase();
    };

    const baseLogin = `${normalize(primeiro)}.${normalize(ultimo)}`;

    // 3) Evitar duplicatas: se existir, acrescenta sufixo numérico
    let login = baseLogin;
    let counter = 1;
    while (true) {
      const [rows] = await db.query('SELECT COUNT(*) AS count FROM usuarios WHERE login = ?', [login]);
      const exists = rows[0].count > 0;
      if (!exists) break;
      login = `${baseLogin}${counter}`;
      counter += 1;
    }

    // 4) Gerar senha: AAAAMMDD a partir de data_nascimento

    let senha = '00000000';
    if (data_nascimento && /^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
      senha = data_nascimento.replace(/-/g, '');
    } else {
      // fallback em caso de formato diferente: usa timestamp simples
      senha = String(Date.now()).slice(-8);
    }

    // 5) Inserir usuário (perfil e endereco placeholders — ajuste se quiser pegar do form)
    const perfil = 4;   // placeholder: ajuste para o id correto vindo do form se quiser
    const endereco = 1; // placeholder: id de endereco padrão

    await db.query(
      `INSERT INTO usuarios 
        (login, senha, ativo, perfil_id_cargos, cadastro_funcionario_id_funcionario, endereco_id_endereco)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [login, senha, 1, perfil, idFuncionario, endereco]
    );

    // 6) Responder com login/senha gerados
    res.status(201).json({
      message: 'Funcionário e usuário criados com sucesso!',
      loginGerado: login,
      senhaGerada: senha
    });

  } catch (err) {
    console.error('Erro ao criar funcionário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar funcionário' });
  }
};
