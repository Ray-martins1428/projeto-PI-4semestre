const express = require("express");
const app = express();
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const session = require("express-session");
const db = require("./config/db");
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
const vendaRoutes = require("./routes/api/vendaRoutes");

app.use(
  session({
    name: "sessid",
    secret: process.env.SESSION_SECRET || "troque_isto",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(process.env.SESSION_MAX_AGE) || 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use((req, res, next) => {
  res.locals.usuario = req.session?.usuario || null;

  // 
  res.locals.isAdmin = res.locals.usuario &&
                       (res.locals.usuario.perfil === 1 || 
                        res.locals.usuario.perfil === 2 || 
                        res.locals.usuario.login === 'ADMINISTRADOR' || 
                        res.locals.usuario.login === 'GERENTE' || 
                        res.locals.usuario.login === 'admin' || 
                        res.locals.usuario.login === 'gerente');

  next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../renderer/views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ROTAS API
app.use("/api", loginRoutes);
app.use("/api/funcionarios", funcionariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/produtos", produtoRoutes); // <-- AQUI
app.use("/api/historico", historicoRoutes);
app.use("/api/vendas", vendaRoutes);

// ROTAS DE PÁGINAS
app.use(pageRoute);

// ROTA RAIZ
app.get("/", (req, res) => {
  res.render("index");
});

// ERROS
app.use((err, req, res, next) => {
  console.error("Erro no servidor:", err);
  res.status(500).send("Erro interno no servidor");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
