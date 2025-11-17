document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-venda");
  const msgErro = document.getElementById("mensagemErro");
  const cpfInput = document.getElementById("cpf");
  const celularInput = document.getElementById("numero");

  // === Funções de Máscara ===

  // Máscara CPF ( coloca os pontos )
  cpfInput.addEventListener("input", () => {
    let valor = cpfInput.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpfInput.value = valor;
  });

  // Máscara Celular ( deixa no formato (XX) ) 
  celularInput.addEventListener("input", () => {
    let valor = celularInput.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }

    celularInput.value = valor;
  });

  // === Envio do formulário ===
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    msgErro.textContent = ""; // limpa erro anterior

    // Coleta dos campos
    const nomeCompleto = document.getElementById("nome").value.trim().toLowerCase();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const cpf = cpfInput.value.replace(/\D/g, ""); // remove formatação
    const numero = celularInput.value.replace(/\D/g, ""); // remove formatação
    const endereco = document.getElementById("endereco").value.trim().toLowerCase();
    const complemento = document.getElementById("complemento").value.trim().toLowerCase();
    const bairro = document.getElementById("bairro").value.trim().toLowerCase();
    const dataNascimento = document.getElementById("dataNascimento")?.value;

    // Quebra nome completo (primeiro + ultimo)
    const partesNome = nomeCompleto.split(" ");
    const nome = partesNome[0] || "";
    const sobrenome = partesNome.slice(1).join(" ");

    // Função e status
    const funcao = document.querySelector('input[name="funcao"]:checked')?.value;
    const status = document.querySelector('input[name="status"]:checked')?.id === "ativo" ? 1 : 0;

    // Validação básica
    // Deixar email opcional? caso não adicionar validação
    if (!nome || !cpf || !dataNascimento || !funcao) {
      msgErro.textContent = "Preencha nome, CPF e data de nascimento!";
      return;
    }

    try {
      const response = await fetch("http://localhost:4040/api/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          sobrenome,
          email: email,
          RG: "",
          CPF: cpf,
          celular: numero,
          telefone: "",
          data_nascimento: dataNascimento, 
          endereco: endereco,
          complemento: complemento,
          bairro: bairro,
          funcao: funcao,
          ativo: status,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `Funcionário cadastrado!\n\nLogin: ${data.loginGerado}\nSenha: ${data.senhaGerada}`
        );
        window.location.href = "/funcionarios";
      } else {
        msgErro.textContent = data.error || "Erro ao cadastrar funcionário.";
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      msgErro.textContent = "Erro ao conectar com o servidor.";
    }
  });
});
