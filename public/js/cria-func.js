document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-venda");
  const msgErro = document.getElementById("mensagemErro");
  const cpfInput = document.getElementById("cpf");
  const celularInput = document.getElementById("numero");

  let estaEditando = null;

  // Verifica se há dados salvos para edição
  const funcionarioEditando = localStorage.getItem('funcionarioEditando');
  if (funcionarioEditando) {
    const funcionario = JSON.parse(funcionarioEditando);
    preencherFormulario(funcionario);

    const btnCadastrar = document.getElementById("cadastrar");
    btnCadastrar.textContent = "Atualizar";
    btnCadastrar.dataset.editando = funcionario.id_funcionario;
    estaEditando = funcionario.id_funcionario;

    // Limpa os dados do localStorage após usar
    localStorage.removeItem('funcionarioEditando');
  }

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

    // Atualiza a variável estaEditando (adicionar esta linha)
    estaEditando = document.getElementById("cadastrar").dataset.editando || null;

    // Coleta dos campos
    const nomeCompleto = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const cpf = cpfInput.value.replace(/\D/g, ""); // remove formatação
    const numero = celularInput.value.replace(/\D/g, ""); // remove formatação
    const endereco = document.getElementById("endereco").value.trim();
    const complemento = document.getElementById("complemento").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const dataNascimento = document.getElementById("dataNascimento")?.value;

    // Quebra nome completo (primeiro + ultimo)
    const partesNome = nomeCompleto.split(" ");
    const nome = partesNome[0] || "";
    const sobrenome = partesNome.slice(1).join(" ");

    // Função e status
    const funcao = document.querySelector('input[name="funcao"]:checked')?.value || null;
    const status = document.querySelector('input[name="status"]:checked')?.id === "ativo" ? 1 : 0;

    // Validação básica
    if (!nome || !cpf || !dataNascimento) {
      msgErro.textContent = "Preencha nome, CPF e data de nascimento!";
      return;
    }

    if (!funcao) {
      msgErro.textContent = "Selecione uma função!";
      return;
    }

    try {
      const url = estaEditando
        ? `http://localhost:4040/api/funcionarios/editar/${estaEditando}`  // ← ROTA NOVA
        : "http://localhost:4040/api/funcionarios";

      const method = estaEditando ? "PUT" : "POST";

      const funcionarioEditando = JSON.parse(localStorage.getItem('funcionarioEditando') || '{}'); 
      // buscando os valores que vieram da storage para trazer o id do endereço

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
          sobrenome: sobrenome,
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
          id_endereco: funcionarioEditando.id_endereco 
          // enviar o id do endereço para conseguir alterar no momento de usar a rota de alteração
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (estaEditando) {
          alert("Funcionário atualizado com sucesso!");
          form.reset();
          const btnCadastrar = document.getElementById("cadastrar");
          btnCadastrar.textContent = "Cadastrar";
          delete btnCadastrar.dataset.editando;
          estaEditando = null;
          window.location.href = "/funcionarios";
        } else {
          alert(`Funcionário cadastrado!\n\nLogin: ${data.loginGerado}\nSenha: ${data.senhaGerada}`);
          window.location.href = "/funcionarios";
        }
      } else {
        msgErro.textContent = data.error || "Erro ao cadastrar funcionário.";
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      msgErro.textContent = "Erro ao conectar com o servidor.";
    }
  });

  function preencherFormulario(funcionario) {
    // Nome completo (junta nome + sobrenome)
    document.getElementById("nome").value = `${funcionario.nome} ${funcionario.sobrenome}`.trim();

    // CPF (com máscara)
    const cpfInput = document.getElementById("cpf");
    let cpfFormatado = funcionario.CPF || '';
    if (cpfFormatado.length === 11) {
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    cpfInput.value = cpfFormatado;

    // Data de nascimento
    let dataNascimento = funcionario.data_nascimento || '';
    if (dataNascimento) {
      // Converte para objeto Date e formata para YYYY-MM-DD
      const data = new Date(dataNascimento);
      if (!isNaN(data.getTime())) { // Verifica se é uma data válida
        const ano = data.getFullYear();
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
        const dia = String(data.getDate()).padStart(2, '0');
        dataNascimento = `${ano}-${mes}-${dia}`;
      } else {
        dataNascimento = ''; // Data inválida
      }
    }
    document.getElementById("dataNascimento").value = dataNascimento;

    // Email
    document.getElementById("email").value = funcionario.email || '';

    // Celular (com máscara)
    const celularInput = document.getElementById("numero");
    let celularFormatado = funcionario.celular || '';
    if (celularFormatado.length === 11) {
      celularFormatado = celularFormatado.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (celularFormatado.length === 10) {
      celularFormatado = celularFormatado.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
    celularInput.value = celularFormatado;

    // Endereço
    document.getElementById("endereco").value = funcionario.rua || '';
    document.getElementById("complemento").value = funcionario.numero || '';
    document.getElementById("bairro").value = funcionario.bairro || '';

    // Função (radio buttons)
    const radioFuncao = document.querySelector(`input[name="funcao"][value="${funcionario.perfil_id_cargos}"]`);
    if (radioFuncao) {
      radioFuncao.checked = true;
    }

    // Status (radio buttons)
    const radioStatus = document.querySelector(`input[name="status"][id="${funcionario.ativo === 1 ? 'ativo' : 'inativo'}"]`);
    if (radioStatus) {
      radioStatus.checked = true;
    }
  }

});
