// ---------------------------
// ELEMENTOS DO MODAL CADASTRO
// ---------------------------
const modal = document.getElementById("modal");
const abrirModal = document.getElementById("abrirModal");
const fecharModal = document.getElementById("close");
const cadastrar = document.getElementById("cadastrar");

// ---------------------------
// ELEMENTOS DO MODAL EDITAR
// ---------------------------
const modalEditar = document.getElementById("modalEditar");
const fecharModalEditar = document.getElementById("closeEditar");
const salvarEdicao = document.getElementById("salvarEdicao");

let idProdutoEditando = null;

// ---------------------------
// ABRIR / FECHAR MODAL CADASTRO
// ---------------------------
abrirModal.addEventListener("click", () => {
  modal.style.display = "flex";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// ---------------------------
// CADASTRAR PRODUTO (POST)
// ---------------------------
cadastrar.addEventListener("click", async (e) => {
  e.preventDefault();

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
      body: JSON.stringify({
        nome,
        volume,
        valor,
        estoque_saldo
      })
    });

    if (response.ok) {
      alert("Produto cadastrado!");
      location.reload();
    } else {
      alert("Erro ao cadastrar produto!");
    }
  } catch (error) {
    console.error(error);
    alert("Falha ao se comunicar com o servidor");
  }
});

// ---------------------------
// FUNÇÃO ABRIR MODAL DE EDIÇÃO
// ---------------------------
function abrirEditar(id, nome, volume, quantidade, preco) {
  idProdutoEditando = id;

  document.getElementById("editQuantidade").value = quantidade;
  document.getElementById("editPreco").value = preco;

  modalEditar.style.display = "flex";
}

// ---------------------------
// FECHAR MODAL EDITAR
// ---------------------------
fecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
});

// ---------------------------
// SALVAR EDIÇÃO (PUT)
// ---------------------------
salvarEdicao.addEventListener("click", async () => {
  const quantidade = document.getElementById("editQuantidade").value.trim();
  const preco = document.getElementById("editPreco").value.trim();

  if (!quantidade || !preco) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    const response = await fetch(`/produto/${idProdutoEditando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estoque_saldo: quantidade,
        valor: preco
      }),
    });

    if (response.ok) {
      alert("Produto atualizado!");
      location.reload();
    } else {
      alert("Erro ao atualizar produto");
    }
  } catch (error) {
    console.error(error);
    alert("Falha ao enviar edição");
  }
});

// ---------------------------
// DELETAR PRODUTO (DELETE)
// ---------------------------
async function deletar(id) {
  if (!confirm("Tem certeza que deseja excluir?")) return;

  try {
    const response = await fetch(`/produto/${id}`, { method: "DELETE" });

    if (response.ok) {
      alert("Produto excluído!");
      location.reload();
    } else {
      alert("Erro ao deletar produto");
    }
  } catch (error) {
    console.error(error);
    alert("Falha ao deletar produto");
  }
}

window.deletar = deletar;
window.abrirEditar = abrirEditar;
