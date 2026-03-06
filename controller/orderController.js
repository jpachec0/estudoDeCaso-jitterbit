const orderService = require("../service/orderService");

/**
 * Cria um novo pedido.
 */
exports.createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Busca um pedido pelo ID.
 */
exports.getOrder = async (req, res) => {
  try {

    const orderId = req.params.orderId;

    const order = await orderService.getOrder(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};

/**
 * Lista todos os pedidos.
 */
exports.listOrders = async (req, res) => {
  try {

    const orders = await orderService.listOrders();

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Atualiza um pedido existente.
 */
exports.updateOrder = async (req, res) => {
  try {

    const orderId = req.params.orderId;

    const updated = await orderService.updateOrder(orderId, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order updated successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Remove um pedido pelo ID.
 */
exports.deleteOrder = async (req, res) => {
  try {

    const orderId = req.params.orderId;

    const deleted = await orderService.deleteOrder(orderId);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      message: "Order deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};