  module.exports = {
    autenticar(req, res, next) {
      if (!req.session || !req.session.usuario) {
        return res.status(401).json({ message: "Não autenticado." });
      }
      next();
    },

    somenteAdminOuGerente(req, res, next) {
      const perfil = req.session.usuario.perfil_id_cargos;

      if (perfil === 1 || perfil === 2) {
        return next(); 
      }

      return res.status(403).json({ message: "Acesso negado. Permissão insuficiente." });
    }
  };