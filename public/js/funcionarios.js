document.addEventListener("DOMContentLoaded", async () => {
  const tabela = document.getElementById("tabela-corpo");

  try {
    const response = await fetch("http://localhost:4040/api/funcionarios");
    const funcionarios = await response.json();

    tabela.innerHTML = ""; // limpa antes de preencher

    funcionarios.forEach((func) => {
      const linha = document.createElement("div");
      linha.classList.add("tabela-linha");

      linha.innerHTML = `
        <span class="coluna nome-func">${func.nome} ${func.sobrenome}</span>
        <span class="coluna funcao">${func.perfil_nome || "---"}</span>
        <span class="coluna status">${func.ativo ? "Ativo" : "Inativo"}</span>
        <span class="coluna acoes">
          <button class="btn-status" data-id="${
            func.id_funcionario
          }" data-status="${func.ativo}">
            ${func.ativo ? "Desativar" : "Ativar"}
          </button>
        </span>
      `;

      tabela.appendChild(linha);
    });

    // adiciona eventos para os botões de ativar/inativar
    tabela.addEventListener("click", async (e) => {
      if (e.target.classList.contains("btn-status")) {
        const id = e.target.dataset.id;
        const statusAtual = e.target.dataset.status === "1";
        const novoStatus = statusAtual ? 0 : 1;

        const confirmacao = confirm(
          `Deseja realmente ${
            novoStatus ? "ativar" : "inativar"
          } este funcionário?`
        );
        if (!confirmacao) return;

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
          location.reload();
        } else {
          alert("Erro ao atualizar status!");
        }
      }
    });
  } catch (error) {
    console.error("Erro ao buscar funcionários:", error);
    tabela.innerHTML = "<p>Erro ao carregar funcionários</p>";
  }
});
