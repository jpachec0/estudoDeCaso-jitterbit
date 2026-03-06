const orderService = require("../service/orderService");

exports.createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

exports.listOrders = async (req, res) => {
  try {

    const orders = await orderService.listOrders();

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};