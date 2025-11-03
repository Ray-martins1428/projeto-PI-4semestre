document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btnLogin');
    const form = document.querySelector('.login-form');
    const errorDiv = document.getElementById('login-error-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // impede o reload da página

        const usuario = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;


        errorDiv.textContent = '';

        try {
            const response = await fetch('http://localhost:4040/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login: usuario, senha: senha })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login bem-sucedido:', data);
                window.location.href = 'http://localhost:4040/dashboard';
            } else {
                errorDiv.textContent = "Usuário ou senha incorretos!";
            }
        } catch (err) {
            console.error('Erro na requisição:', err);
            errorDiv.textContent = "Erro ao conectar com o servidor!";
        }
    });
});
