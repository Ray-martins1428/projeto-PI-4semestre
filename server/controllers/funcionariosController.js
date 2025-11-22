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
      WHERE p.nome <> 'ADMINISTRADOR'
      ORDER BY f.id_funcionario;
    `);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao listar funcionários:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

// ========================
// PESQUISAR FUNCIONÁRIOS
// ========================
exports.pesquisarFuncionario = async (req, res) => {
  try {
    const { nome } = req.params;

    // Correção: Remover as aspas simples extras e usar CONCAT para o LIKE
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
      WHERE p.nome <> 'ADMINISTRADOR'
      AND f.nome LIKE CONCAT('%', ?, '%')
    `, [nome]);

    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar funcionários:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionários' });
  }
};

// ========================
// PESQUISAR FUNCIONÁRIO POR ID (PRÉ ATUALIZAÇÃO)
// ========================
exports.pequisarFuncionarioId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(`
      SELECT 
        f.id_funcionario,
        f.nome,
        f.sobrenome,
        f.email,
        f.RG,
        f.CPF,
        f.celular,
        f.telefone,
        f.data_nascimento, 
        e.rua,
        e.numero, 
        e.bairro,
        e.id_endereco, 
        u.perfil_id_cargos, 
        IFNULL(p.nome, '') AS perfil_nome,
        IFNULL(u.ativo, 0) AS ativo
      FROM cadastro_funcionario f
      LEFT JOIN usuarios u ON f.id_funcionario = u.cadastro_funcionario_id_funcionario
      LEFT JOIN perfil p ON u.perfil_id_cargos = p.id_cargos
      LEFT JOIN endereco e ON u.endereco_id_endereco = e.id_endereco
      WHERE p.nome <> 'ADMINISTRADOR'
      AND f.id_funcionario = ?
    `, [id]);

    if (rows.length > 0) {
      res.json(rows[0]);  // ← Retorna o objeto, não o array
    } else {
      res.status(404).json({ error: 'Funcionário não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao buscar funcionário por ID:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionário' });
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
  const { endereco, complemento, bairro, nome, sobrenome, email, RG, CPF, celular, telefone, data_nascimento, funcao, ativo } = req.body;

  try {
    const [resultado1] = await db.query(
      `INSERT INTO endereco (rua, numero, bairro, cidade, cep)
      values (?, ?, ?, 'Aguaí', '13860001')`,
      [endereco, complemento, bairro]
    );


    const idEndereco = resultado1.insertId;


    // 1) Inserir funcionário (inclui DATA_NASCIMENTO)
    const [resultado] = await db.query(
      `INSERT INTO cadastro_funcionario 
        (nome, sobrenome, email, RG, CPF, celular, telefone, DATA_NASCIMENTO)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, sobrenome, email || null, RG || null, CPF || null, celular || null, telefone || null, data_nascimento || '1900-01-01']
    );

    const idFuncionario = resultado.insertId;

    // 2) Gerar login no formato: primeiroNome.ultimoSobrenome
    // juntar nome + sobrenome caso sobrenome venha separado (seu front já manda nome e sobrenome separados)
    // Mas vamos extrair primeiro nome / último sobrenome de forma robusta caso sobrenome contenha espaços.
    const primeiro = (nome || '').trim().split(/\s+/)[0] || 'user';
    // pegar o último word do sobrenome (se vazio, tenta do nome)
    const ultimo = (sobrenome || '').trim().split(/\s+/).filter(Boolean).slice(-1)[0]
      || ((nome || '').trim().split(/\s+/).slice(-1)[0])
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
    const perfil = funcao;   // placeholder: ajuste para o id correto vindo do form se quiser
    // placeholder: id de endereco padrão

    await db.query(
      `INSERT INTO usuarios 
        (login, senha, ativo, perfil_id_cargos, cadastro_funcionario_id_funcionario, endereco_id_endereco)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [login, senha, 1, perfil, idFuncionario, idEndereco]
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


//ATUALIZAR INFORMAÇÕES DO USUÁRIO:
exports.atualizarFuncionario = async (req, res) => {
  const { id } = req.params;
  const { endereco, complemento, bairro, nome, sobrenome, email, RG, CPF, celular, telefone, data_nascimento, funcao, ativo, id_endereco } = req.body;
  console.log(id_endereco);

  try {
    if (id_endereco) {
      await db.query(
        `UPDATE endereco set rua = ?, numero = ?, bairro = ? where id_endereco = ?`,
        [endereco || null, complemento || null, bairro || null, id_endereco]
      );
    };

    // 1. Atualizar dados do funcionário
    await db.query(
      `UPDATE cadastro_funcionario 
       SET nome = ?, sobrenome = ?, email = ?, RG = ?, CPF = ?, celular = ?, telefone = ?, DATA_NASCIMENTO = ?
       WHERE id_funcionario = ?`,
      [nome, sobrenome, email || null, RG || null, CPF || null, celular || null, telefone || null, data_nascimento || '1900-01-01', id]
    );

    // 2. Atualizar perfil do usuário
    await db.query(
      `UPDATE usuarios 
       SET perfil_id_cargos = ?, ativo = ?
       WHERE cadastro_funcionario_id_funcionario = ?`,
      [funcao, ativo, id]
    );

    res.status(200).json({ message: 'Funcionário atualizado com sucesso!' });

  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
};


