const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const db = require("./config/db"); // Conexão com o banco
const PORT = process.env.PORT || 4040;
const pageRoute = require('./routes/routes');

// Importa as rotas para produtos e histórico
const produtoRoutes = require("./routes/api/produtosRoutes");
const historicoRoutes = require("./routes/api/historicoRoutes");

// Importa as rotas que você já tem
const loginRoutes = require("./routes/api/loginRoutes");
const funcionariosRoutes = require("./routes/api/funcionariosRoutes");
const authRoutes = require("./routes/api/authRoutes");
const dashboardRoutes = require("./routes/api/dashboardRoutes");


// --- SESSÃO ---
app.use(session({
  name: 'sessid',
  secret: process.env.SESSION_SECRET || 'troque_isto',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24, // 1 dia
    httpOnly: true,
    // secure: true // habilitar em produção com HTTPS
  }
}));

// Expõe session/usuario para as views EJS
app.use((req, res, next) => {
  res.locals.usuario = req.session?.usuario || null;
  next();
});

// View engine / static / parsers
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../renderer/views"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- Rotas API ---
app.use("/api", loginRoutes);                   // /api/login e /api/session
app.use("/api/funcionarios", funcionariosRoutes); // /api/funcionarios/...
app.use("/api/auth", authRoutes);               // /api/auth/logout
app.use("/api/dashboard", dashboardRoutes); // dashboar
app.use("/api/historico", historicoRoutes); // historico


// --- Rotas EJS / Páginas ---
app.use(produtoRoutes); // Rota para produtos
app.use(dashboardRoutes);
app.use('/', pageRoute);


// Rota raiz (caso queira)
app.get("/", (req, res) => {
  res.render("index");
});

// Middleware de erro simples (opcional)
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).send("Erro interno no servidor");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});