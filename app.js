const express = require("express");
const orderRoutes = require("./route/orderRoute");

const app = express();

app.use(express.json());

app.use("/", orderRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

