document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".login-form");
  const errorDiv = document.getElementById("login-error-message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    errorDiv.textContent = "";

    try {
      const response = await fetch("http://localhost:4040/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: usuario, senha: senha }),
      });

      const data = await response.json();
      console.log("Resposta do login:", data); // <--- veja o que retorna

      if (response.ok) {
        console.log("Login bem-sucedido:", data);

        const isAdmin =
          data.perfil === 1 ||
          data.perfil === 2 ||
          data.login === "ADMINISTRADOR" ||
          data.login === "GERENTE" ||
          data.login === "admin" ||
          data.login === "gerente";

        if (isAdmin) {
          window.location.href = "http://localhost:4040/dashboard";
        } else {
          window.location.href = "http://localhost:4040/estoque";
        }
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      errorDiv.textContent = "Erro ao conectar com o servidor!";
    }
  });
});
