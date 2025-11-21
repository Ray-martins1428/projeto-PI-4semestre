
// MODAL CADASTRO-----MODAL CADASTRO-----MODAL CADASTRO-----MODAL CADASTRO-----MODAL CADASTRO-----MODAL CADASTRO-----

const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("close");
const cadastrar = document.getElementById("cadastrar");


// MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----

const modalEditar = document.getElementById("modalEditar");
const fecharModalEditar = document.getElementById("closeEditar");
const salvarEdicao = document.getElementById("salvarEdicao");

let idProdutoEditando = null;


// ABRIR / FECHAR CADASTRO-----ABRIR / FECHAR CADASTRO-----ABRIR / FECHAR CADASTRO-----ABRIR / FECHAR CADASTRO-----ABRIR / FECHAR CADASTRO-----ABRIR / FECHAR CADASTRO-----

abrirModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});


// CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----CADASTRAR PRODUTO-----

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
    const response = await fetch("/produto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, volume, valor, estoque_saldo })
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


// MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----MODAL EDITAR-----

function abrirEditar(id, nome, volume, quantidade, preco) {
  idProdutoEditando = id;
  document.getElementById("editPreco").value = preco;
  modalEditar.style.display = "flex";
}

fecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});


// SALVAR EDIÇÃO-----SALVAR EDIÇÃO-----SALVAR EDIÇÃO-----SALVAR EDIÇÃO-----SALVAR EDIÇÃO-----SALVAR EDIÇÃO-----

salvarEdicao.addEventListener("click", async () => {
  const preco = document.getElementById("editPreco").value.trim();

  if (!preco) {
    alert("Informe o valor!");
    return;
  }

  try {
    const response = await fetch(`/produto/${idProdutoEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor: preco })
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


// DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----DELETAR PRODUTO-----

async function deletar(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  try {
    const response = await fetch(`/produto/${id}`, { method: "DELETE" });
    if (response.ok) {
      alert("Produto excluído!");
      location.reload();
    } else {
      alert("Erro ao excluir");
    }
  } catch (err) {
    console.error("Erro:", err);
  }
}


// MODAL ADICIONAR ESTOQUE-----MODAL ADICIONAR ESTOQUE-----MODAL ADICIONAR ESTOQUE-----MODAL ADICIONAR ESTOQUE-----MODAL ADICIONAR ESTOQUE-----MODAL ADICIONAR ESTOQUE-----

const modalAddEstoque = document.getElementById("modalAddEstoque");
const fecharModalAdd = document.getElementById("closeAddEstoque");
const btnSalvarAdd = document.getElementById("salvarAddEstoque");
const inputQuantAdd = document.getElementById("quantAdd");

let idProdutoAdicionando = null;

// Abrir modal ao clicar no +
document.querySelectorAll(".btn-add-estoque").forEach(btn => {
  btn.addEventListener("click", () => {
    idProdutoAdicionando = btn.dataset.id;

    // limpa input e habilita novamente
    inputQuantAdd.value = "";
    inputQuantAdd.disabled = false;

    // EXIBE MODAL
    modalAddEstoque.style.display = "flex";

    // BLOQUEIA O FUNDO (impede scroll e bugs)
    document.body.classList.add("modal-open");

    // focus automático
    setTimeout(() => inputQuantAdd.focus(), 50);
  });
});

// Fechar modal
fecharModalAdd.addEventListener("click", () => {
  modalAddEstoque.style.display = "none";

  // DESBLOQUEIA FUNDO
  document.body.classList.remove("modal-open");

  inputQuantAdd.value = "";
  inputQuantAdd.blur();
});

// Salvar quantidade adicionada
btnSalvarAdd.addEventListener("click", async () => {
  const quantidade = inputQuantAdd.value.trim();

  if (!quantidade || isNaN(quantidade)) {
    alert("Digite um valor válido");
    return;
  }

  try {
    const response = await fetch(`/produto/adicionar-estoque/${idProdutoAdicionando}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantidade })
    });

    const data = await response.json();
    console.log("Resposta do servidor:", data);

    if (response.ok) {
      alert("Estoque atualizado!");

      modalAddEstoque.style.display = "none";

      // DESBLOQUEIA FUNDO
      document.body.classList.remove("modal-open");

      inputQuantAdd.value = "";
      location.reload();
    } else {
      alert("Erro ao adicionar estoque");
    }

  } catch (error) {
    console.error("Erro ao enviar estoque:", error);
  }
});

window.deletar = deletar;
window.abrirEditar = abrirEditar;
