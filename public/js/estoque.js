// =========================
// MODAL CADASTRO
// =========================
const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("close");
const cadastrar = document.getElementById("cadastrar");

// =========================
// MODAL EDITAR
// =========================
const modalEditar = document.getElementById("modalEditar");
const fecharModalEditar = document.getElementById("closeEditar");
const salvarEdicao = document.getElementById("salvarEdicao");

let idProdutoEditando = null;

// =========================
// ABRIR / FECHAR CADASTRO
// =========================
abrirModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// =========================
// CADASTRAR PRODUTO
// =========================
cadastrar.addEventListener("click", async () => {
  const nome = document.getElementById("nome").value.trim();
  const volume = document.getElementById("volume").value.trim();
  const valor = document.getElementById("valor").value.trim();
  const estoque_saldo = document.getElementById("estoque_saldo").value.trim();

  if (!nome || !volume || !valor || !estoque_saldo) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch("/api/produtos/produto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, volume, valor, estoque_saldo }),
    });

    if (response.ok) {
      alert("Produto cadastrado!");
      location.reload();
    } else {
      alert("Erro ao cadastrar produto");
    }
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
  }
});

// =========================
// ABRIR MODAL EDITAR
// =========================
window.abrirEditar = (id, nome, volume, quantidade, preco) => {
  idProdutoEditando = id;
  document.getElementById("editPreco").value = preco;
  modalEditar.style.display = "flex";
};

fecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});

// =========================
// SALVAR EDIÇÃO
// =========================
salvarEdicao.addEventListener("click", async () => {
  const preco = document.getElementById("editPreco").value.trim();

  if (!preco) {
    alert("Informe o valor!");
    return;
  }

  try {
    const response = await fetch(`/api/produtos/produto/${idProdutoEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor: preco }),
    });

    if (response.ok) {
      alert("Atualizado!");
      location.reload();
    } else {
      alert("Erro ao editar");
    }
  } catch (err) {
    console.error("Erro:", err);
  }
});

// =========================
// DELETAR PRODUTO
// =========================
window.deletar = async (id) => {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  try {
    const response = await fetch(`/api/produtos/produto/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Produto excluído!");
      location.reload();
    } else {
      alert("Erro ao excluir");
    }
  } catch (err) {
    console.error("Erro:", err);
  }
};

// =========================
// MODAL ADICIONAR ESTOQUE
// =========================
const modalAddEstoque = document.getElementById("modalAddEstoque");
const fecharModalAdd = document.getElementById("closeAddEstoque");
const btnSalvarAdd = document.getElementById("salvarAddEstoque");
const inputQuantAdd = document.getElementById("quantAdd");

let idProdutoAdicionando = null;

// ABRIR MODAL DE ADD ESTOQUE
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-estoque")) {
    idProdutoAdicionando = e.target.dataset.id;
    inputQuantAdd.value = "";
    modalAddEstoque.style.display = "flex";
    document.body.classList.add("modal-open");

    setTimeout(() => inputQuantAdd.focus(), 50);
  }
});

// FECHAR MODAL ADD
fecharModalAdd.addEventListener("click", () => {
  modalAddEstoque.style.display = "none";
  document.body.classList.remove("modal-open");
  inputQuantAdd.value = "";
});

// =========================
// SALVAR ADIÇÃO DE ESTOQUE
// =========================
btnSalvarAdd.onclick = async () => {
  const quantidade = inputQuantAdd.value.trim();

  if (!quantidade || isNaN(quantidade)) {
    alert("Digite uma quantidade válida");
    return;
  }

  try {
    const response = await fetch(
      `/api/produtos/produto/adicionar-estoque/${idProdutoAdicionando}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_produto: idProdutoAdicionando,
          quantidade: Number(quantidade)
        }),
      }
    );

    let data = null;
    try {
      data = await response.json();
    } catch (err) {
      alert("Erro ao adicionar estoque");
      return;
    }

    if (response.ok) {
      alert("Estoque atualizado!");
      modalAddEstoque.style.display = "none";
      document.body.classList.remove("modal-open");
      inputQuantAdd.value = "";
      location.reload();
    } else {
      alert("Erro ao adicionar estoque: " + data.message);
    }
  } catch (error) {
    console.error("Erro ao enviar estoque:", error);
  }
};
