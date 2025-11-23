document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.getElementById("tabela-corpo");
  const campoBusca = document.getElementById("campoBusca");
  const alerta = window.aviso.alerta;
  const sucesso = window.aviso.sucesso;
  const erro = window.aviso.erro;
  const confirmacao = window.api.confirmar;

  let historico = []; // lista completa
  let historicoFiltrado = []; // lista filtrada

  // ==========================
  // FORMATAR DATA
  // ==========================
  function formatarData(dataISO) {
    if (!dataISO) return "-";
    const data = new Date(dataISO);
    return data.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // ==========================
  // RENDERIZAR TABELA
  // ==========================
  function renderTabela(lista) {
    tabela.innerHTML = "";

    if (lista.length === 0) {
      tabela.innerHTML = `<div class="tabela-linha"><span>Nenhum registro encontrado...</span></div>`;
      return;
    }

    lista.forEach((item) => {
      const linha = document.createElement("div");
      linha.classList.add("tabela-linha");

      linha.innerHTML = `
    <span>${item.produto}</span>
    <span>${item.tipo}</span>
    <span>${item.qtd}</span>
    <span>${item.data}</span>
`;

      tabela.appendChild(linha);
    });
  }

  // ==========================
  // FILTRAR POR NOME
  // ==========================
  function filtrar() {
    const texto = campoBusca.value.toLowerCase();

    historicoFiltrado = historico.filter((item) =>
      item.produto.toLowerCase().includes(texto)
    );

    renderTabela(historicoFiltrado);
  }

  campoBusca.addEventListener("input", filtrar);

  // ==========================
  // BUSCAR HISTÓRICO DA API
  // ==========================
  async function carregarHistorico() {
    try {
      const resposta = await fetch("http://localhost:4040/api/historico");
      const dados = await resposta.json();

      historico = dados;
      historicoFiltrado = dados;

      renderTabela(historicoFiltrado);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
    }
  }

  carregarHistorico();
});
