const express = require("express");
const orderRoutes = require("./route/orderRoute");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

app.use(express.json());

app.use("/", orderRoutes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3000, () => {
  console.log("Server running on port 3000");
});