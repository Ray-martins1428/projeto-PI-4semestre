// server/app.js
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const session = require("express-session");
const db = require("./config/db"); // Conexão com o banco
const PORT = process.env.PORT || 4040;

// importa rotas (verifique se esses arquivos existem)
const loginRoutes = require("./routes/api/loginRoutes");
const funcionariosRoutes = require("./routes/api/funcionariosRoutes");
const authRoutes = require("./routes/api/authRoutes");
const dashboardRoutes = require("./routes/routes");

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

// expor session/usuario para as views EJS
app.use((req, res, next) => {
  res.locals.usuario = req.session?.usuario || null;
  next();
});

// view engine / static / parsers
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../renderer/views"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// --- rotas API ---
app.use("/api", loginRoutes);                   // /api/login  e /api/session
app.use("/api/funcionarios", funcionariosRoutes); // /api/funcionarios/...
app.use("/api/auth", authRoutes);               // /api/auth/logout

// --- rotas EJS / páginas ---
app.use(dashboardRoutes);

// rota raiz (caso queira)
app.get("/", (req, res) => {
  res.render("index");
});

// middleware de erro simples (opcional)
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).send("Erro interno no servidor");
});

// iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
