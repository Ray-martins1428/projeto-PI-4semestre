document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("tabela-corpo");
  const campoPesquisa = document.getElementById('campoPesquisa');
  const iconeEnviar = document.querySelector('.icone-enviar');
  const iconePesquisa = document.querySelector('.icone-pesquisa');

  // Função para carregar funcionários
  async function carregarFuncionarios(termo = '') {
    try {
      const url = termo
        ? `http://localhost:4040/api/funcionarios/pesquisar?nome=${encodeURIComponent(termo)}`
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
          <button class="btn-status" data-id="${func.id_funcionario}" data-status="${func.ativo}">
            ${func.ativo === 1 ? "Desativar" : "Ativar"}
          </button>
        </span>
      `;

      tabela.appendChild(linha);
    });
  }

  // Função para executar a pesquisa
  function executarPesquisa() {
    const termo = campoPesquisa.value.trim();
    carregarFuncionarios(termo);
  }

  // Função para buscar funcionários (pesquisa específica)
  async function pesquisarFuncionarios(termoPesquisa) {
    try {
      if (!termoPesquisa.trim()) {
        alert("Por favor, digite um termo para pesquisa");
        return;
      }

      const resp = await fetch(`http://localhost:4040/api/funcionarios/pesquisar?nome=${encodeURIComponent(termoPesquisa)}`);

      if (!resp.ok) {
        throw new Error('Erro na busca');
      }

      const funcionarios = await resp.json();
      atualizarTabela(funcionarios);

    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      alert("Erro ao realizar a pesquisa");
    }
  }

  // Event Listeners
  function configurarEventListeners() {
    // Evento de clique no ícone de enviar
    iconeEnviar.addEventListener('click', executarPesquisa);

    // Evento de clique no ícone de pesquisa
    iconePesquisa.addEventListener('click', executarPesquisa);

    // Evento de Enter no campo de pesquisa
    campoPesquisa.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        executarPesquisa();
      }
    });

    // Evento para os botões de ativar/inativar
    tabela.addEventListener("click", async (e) => {
      if (e.target.classList.contains("btn-status")) {
        const id = e.target.dataset.id;
        const statusAtual = parseInt(e.target.dataset.status);
        const novoStatus = statusAtual === 1 ? 0 : 1;

        const confirmacao = confirm(
          `Deseja realmente ${novoStatus === 1 ? "ativar" : "inativar"} este funcionário?`
        );

        if (!confirmacao) return;

        try {
          const resp = await fetch(
            `http://localhost:4040/api/funcionarios/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ativo: novoStatus }),
            }
          );

          if (resp.ok) {
            alert("Status atualizado com sucesso!");
            carregarFuncionarios(campoPesquisa.value.trim()); // Recarrega mantendo a pesquisa atual
          } else {
            alert("Erro ao atualizar status!");
          }
        } catch (error) {
          console.error("Erro ao atualizar status:", error);
          alert("Erro ao atualizar status!");
        }
      }
    });
  }

  // Inicialização
  try {
    await carregarFuncionarios(); // Carrega todos os funcionários inicialmente
    configurarEventListeners(); // Configura os event listeners
  } catch (error) {
    console.error("Erro na inicialização:", error);
  }
});