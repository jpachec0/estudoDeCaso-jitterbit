const express = require("express");
const orderRoutes = require("./route/orderRoute");

const app = express();

app.use(express.json());

app.use("/", orderRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.put('/order/:numeroPedido', (req, res) => {
    const { numeroPedido } = req.params;
    const { cliente, valor } = req.body;

    const sql = "UPDATE orders SET cliente = ?, valor = ? WHERE numeroPedido = ?";

    db.query(sql, [cliente, valor, numeroPedido], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({ message: "Order updated successfully" });
    });
});