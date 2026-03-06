const mysql = require("mysql2/promise");

/**
 * Pool de conexões com o MySQL.
 * Utilizado para gerenciar múltiplas conexões de forma eficiente.
 */
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456Abc-",
  database: "jitterbit",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;