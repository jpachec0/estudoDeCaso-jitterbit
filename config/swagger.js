const swaggerJsdoc = require("swagger-jsdoc");

/**
 * Configuração do Swagger para documentação da API.
 * Lê as anotações presentes nos arquivos de rota.
 */
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jitterbit Order API",
      version: "1.0.0",
      description: "API para gerenciamento de pedidos"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./route/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;