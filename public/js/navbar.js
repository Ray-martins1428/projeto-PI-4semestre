document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('link-logout');
  if (!logoutLink) return;

  logoutLink.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const resp = await fetch('/api/auth/logout', { method: 'POST' });
      if (resp.ok) window.location.href = '/';
    } catch (err) {
      console.error('Erro no logout', err);
      window.location.href = '/';
    }
  });
});



// finaliza a sessao 