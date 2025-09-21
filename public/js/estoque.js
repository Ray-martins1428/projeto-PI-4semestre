const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("close");
const cadastrar = document.getElementById("cadastrar");
const tabelaCorpo = document.getElementById("tabela-corpo");

const modalEditar = document.getElementById("modalEditar");
const fecharModalEditar = document.getElementById("closeEditar");
const salvarEdicao = document.getElementById("salvarEdicao");

let linhaEditando = null; // para armazenar a linha em edição

// modal de cadastro
abrirModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// cadastra produto novo na tabela
cadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const tipo = document.getElementById("tipo").value.trim();
  const quantidade = document.getElementById("quantidade").value.trim();
  const preco = document.getElementById("preco").value.trim();

  if (nome && tipo && quantidade && preco) {
    const linha = document.createElement("div");
    linha.classList.add("tabela-linha");
    linha.innerHTML = `
          <span class="coluna nome-prod">${nome}</span>
          <span class="coluna tipo">${tipo}</span>
          <span class="coluna quantidade">${quantidade}</span>
          <span class="coluna acoes">
            <button class="btn-acao editar">E</button>
            <button class="btn-acao lixeira">X</button>
          </span>
        `;
    tabelaCorpo.appendChild(linha);
    modal.style.display = "none";

    document.getElementById("nome").value = "";
    document.getElementById("tipo").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("preco").value = "";
  } else {
    alert("Preencha todos os campos!");
  }
});

// fecha modal de edição
fecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});

// editar e excluir
tabelaCorpo.addEventListener("click", (e) => {
  if (e.target.classList.contains("lixeira")) {
    e.target.closest(".tabela-linha").remove();
  }

  if (e.target.classList.contains("editar")) {
    linhaEditando = e.target.closest(".tabela-linha");
    const quantidade = linhaEditando.querySelector(".quantidade").textContent;

    document.getElementById("editQuantidade").value = quantidade;
    modalEditar.style.display = "flex";
  }
});

// salva edit
salvarEdicao.addEventListener("click", () => {
  if (linhaEditando) {
    const novaQuantidade = document
      .getElementById("editQuantidade")
      .value.trim();

    if (novaQuantidade) {
      linhaEditando.querySelector(".quantidade").textContent = novaQuantidade;
      modalEditar.style.display = "none";
      linhaEditando = null;
    } else {
      alert("Preencha o campo de quantidade!");
    }
  }
});
