const urlParams = new URLSearchParams(window.location.search);
    const errorMessageDiv = document.getElementById('login-error-message');
    
    if (urlParams.get('error') === '1' && errorMessageDiv) {
        
        errorMessageDiv.textContent = "Senha ou Usuário Incorreto!";
        
        window.history.replaceState({}, document.title, window.location.pathname);
    }