const express = require("express");
const app = express();
const path = require("path");

// === Carregar .env corretamente (pois app.js está dentro de /server) ===
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const session = require("express-session");
const db = require("./config/db"); // Conexão com o banco
const PORT = process.env.PORT || 4040;

// Rotas de páginas
const pageRoute = require("./routes/routes");

// Rotas API
const produtoRoutes = require("./routes/api/produtosRoutes");
const historicoRoutes = require("./routes/api/historicoRoutes");
const loginRoutes = require("./routes/api/loginRoutes");
const funcionariosRoutes = require("./routes/api/funcionariosRoutes");
const authRoutes = require("./routes/api/authRoutes");
const dashboardRoutes = require("./routes/api/dashboardRoutes");
const vendasRoutes = require("./routes/api/vendasRoutes");

// ==========================
//  SESSÃO
// ==========================
app.use(
  session({
    name: "sessid",
    secret: process.env.SESSION_SECRET || "troque_isto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge:
        Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24, // 1 dia
      httpOnly: true,
    },
  })
);

// Disponibiliza o usuário na view (EJS)
app.use((req, res, next) => {
  res.locals.usuario = req.session?.usuario || null;
  next();
});

// ==========================
//  Configurações gerais
// ==========================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../renderer/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ==========================
//  ROTAS API
// ==========================
app.use("/api", loginRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/historico", historicoRoutes);
app.use("/api/vendas", vendasRoutes);

// ==========================
//  ROTAS DE PÁGINAS
// ==========================
app.use(produtoRoutes);
app.use(pageRoute);

// ==========================
//  ROTA RAIZ
// ==========================
app.get("/", (req, res) => {
  res.render("index");
});

// ==========================
//  Middleware de erro
// ==========================
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).send("Erro interno no servidor");
});

// ==========================
//  Start
// ==========================
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
