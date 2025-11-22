const mysql = require("mysql2/promise");
const path = require("path");

// === Carrega o .env corretamente (2 níveis acima) ===
require("dotenv").config({
  path: path.join(__dirname, "../../.env"),
});

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool
  .getConnection()
  .then(() => console.log("Conexao com o banco de dados bem-sucedida!"))
  .catch((err) => console.error("Erro ao conectar ao banco:", err));

module.exports = pool;
