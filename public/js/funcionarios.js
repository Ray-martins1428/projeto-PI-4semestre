document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("tabela-corpo");
  const campoPesquisa = document.getElementById('campoBusca');
  const iconeEnviar = document.querySelector('.icone-enviar');
  const iconePesquisa = document.querySelector('.icone-pesquisa');
  const alerta = window.aviso.alerta;
  const sucesso = window.aviso.sucesso;
  const erro = window.aviso.erro;
  const confirmacao = window.api.confirmar;

  // Função para carregar funcionários
  async function carregarFuncionarios(termo = '') {
    try {
      const url = termo
        ? `http://localhost:4040/api/funcionarios/pesquisar/${encodeURIComponent(termo)}`
        : "http://localhost:4040/api/funcionarios";

      const response = await fetch(url);
      const funcionarios = await response.json();

      atualizarTabela(funcionarios);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      tabela.innerHTML = "<p>Erro ao carregar funcionários</p>";
    }
  }

  // Função para atualizar a tabela
  function atualizarTabela(funcionarios) {
    tabela.innerHTML = "";

    if (funcionarios.length === 0) {
      tabela.innerHTML = '<div class="tabela-linha"><span class="coluna">Nenhum funcionário encontrado</span></div>';
      return;
    }

    funcionarios.forEach((func) => {
      const linha = document.createElement("div");
      linha.classList.add("tabela-linha");

      linha.innerHTML = `
        <span class="coluna nome-func">${func.nome} ${func.sobrenome}</span>
        <span class="coluna funcao">${func.perfil_nome || "---"}</span>
        <span class="coluna status">${func.ativo ? "Ativo" : "Inativo"}</span>
        <span class="coluna acoes">
          <button class="btn-editar" data-id="${func.id_funcionario}">Editar</button>
        </span>
      `;

      tabela.appendChild(linha);
    });
  }

  try {
    await carregarFuncionarios(); // Carrega todos os funcionários inicialmente
    configurarEventListeners(); // Configura os event listeners
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }

  function configurarEventListeners() {
    // Função interna para executar pesquisa
    function executarPesquisa() {
      const termo = campoPesquisa.value.trim();
      carregarFuncionarios(termo);
    }

    // Event listeners
    iconeEnviar.addEventListener('click', executarPesquisa);
    iconePesquisa.addEventListener('click', executarPesquisa);
    campoPesquisa.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') executarPesquisa();
    });

    // Evento para botões de status (mantenha igual)
    // Evento para botão editar
    tabela.addEventListener("click", async (e) => {
      if (e.target.classList.contains("btn-editar")) {
        const idFuncionario = e.target.dataset.id;
        await carregarDadosFuncionario(idFuncionario);
      }
    });
  }

  // Adicione a função que estava faltando
  async function carregarDadosFuncionario(idFuncionario) {
    try {
      const response = await fetch(`http://localhost:4040/api/funcionarios/id/${idFuncionario}`);
      if (!response.ok) throw new Error('Erro ao carregar dados');

      const funcionario = await response.json();
      localStorage.setItem('funcionarioEditando', JSON.stringify(funcionario));
      window.location.href = '/cria-func';

    } catch (error) {
      console.error('Erro:', error);
      erro('Erro ao carregar dados do funcionário');
    }
  }

  // Inicialização
  try {
    await carregarFuncionarios();
    configurarEventListeners();
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }

});

