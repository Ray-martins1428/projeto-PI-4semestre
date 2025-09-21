// MODAIS
const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("close");
const cadastrar = document.getElementById("cadastrar");
const tabelaCorpo = document.getElementById("tabela-corpo");

const modalEditar = document.getElementById("modalEditar");
const fecharModalEditar = document.getElementById("closeEditar");
const salvarEdicao = document.getElementById("salvarEdicao");

let linhaEditando = null;

// ABRIR MODAL DE CADASTRO
abrirModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

// FECHAR MODAL DE CADASTRO
fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// CADASTRAR FUNCIONÁRIO
cadastrar.addEventListener("click", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const funcao = document.querySelector('input[name="funcao"]:checked')?.nextElementSibling.textContent;
  const status = document.querySelector('input[name="status"]:checked')?.nextElementSibling.textContent;
  const mensagemErro = document.getElementById("mensagemErro");

  if (nome && funcao && status) {
    const linha = document.createElement("div");
    linha.classList.add("tabela-linha");
    linha.innerHTML = `
      <span class="coluna nome-func">${nome}</span>
      <span class="coluna funcao">${funcao}</span>
      <span class="coluna status">${status}</span>
      <span class="coluna acoes">
        <button class="btn-acao editar">E</button>
      </span>
    `;
    tabelaCorpo.appendChild(linha);
    modal.style.display = "none";

    // Limpar campos
    document.getElementById("nome").value = "";
    document.querySelectorAll('input[name="funcao"]').forEach(i => i.checked = false);
    document.querySelectorAll('input[name="status"]').forEach(i => i.checked = false);
    mensagemErro.textContent = "";
  } else {
    mensagemErro.textContent = "Preencha todos os campos!";
  }
});

// SALVAR EDIÇÃO
salvarEdicao.addEventListener("click", () => {
  const mensagemErroEditar = document.getElementById("mensagemErroEditar");

  if (linhaEditando) {
    const funcao = document.querySelector('input[name="funcaoEditar"]:checked')?.nextElementSibling.textContent;
    const status = document.querySelector('input[name="statusEditar"]:checked')?.nextElementSibling.textContent;

    if (funcao && status) {
      linhaEditando.querySelector(".funcao").textContent = funcao;
      linhaEditando.querySelector(".status").textContent = status;

      modalEditar.style.display = "none";
      linhaEditando = null;
      mensagemErroEditar.textContent = "";
    } else {
      mensagemErroEditar.textContent = "Selecione função e status!";
    }
  }
});

// FECHAR MODAL DE EDIÇÃO
fecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});

// EDITAR FUNCIONÁRIO
tabelaCorpo.addEventListener("click", (e) => {
  if (e.target.classList.contains("editar")) {
    linhaEditando = e.target.closest(".tabela-linha");

    const nome = linhaEditando.querySelector(".nome-func").textContent;
    const funcao = linhaEditando.querySelector(".funcao").textContent;
    const status = linhaEditando.querySelector(".status").textContent;

    // Preencher modal de edição
    modalEditar.querySelector(".nome-colab").textContent = nome;

    // Radios função
    document.querySelectorAll('input[name="funcaoEditar"]').forEach(input => {
      input.checked = input.nextElementSibling.textContent === funcao;
    });

    // Radios status
    document.querySelectorAll('input[name="statusEditar"]').forEach(input => {
      input.checked = input.nextElementSibling.textContent === status;
    });

    modalEditar.style.display = "flex";
  }
});

// SALVAR EDIÇÃO
salvarEdicao.addEventListener("click", () => {
  if (linhaEditando) {
    const funcao = document.querySelector('input[name="funcaoEditar"]:checked')?.nextElementSibling.textContent;
    const status = document.querySelector('input[name="statusEditar"]:checked')?.nextElementSibling.textContent;

    if (funcao && status) {
      linhaEditando.querySelector(".funcao").textContent = funcao;
      linhaEditando.querySelector(".status").textContent = status;

      modalEditar.style.display = "none";
      linhaEditando = null;
    } else {
      alert("Selecione função e status!");
    }
  }
});
