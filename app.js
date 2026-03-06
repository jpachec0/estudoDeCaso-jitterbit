const express = require("express");
const orderRoutes = require("./route/orderRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

/**
 * Middleware para leitura de JSON no body das requisições.
 */
app.use(express.json());

/**
 * Rotas da API
 */
app.use("/", orderRoutes);

/**
 * Documentação Swagger disponível em /docs
 */
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * Inicialização do servidor
 */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});