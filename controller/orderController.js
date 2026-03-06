const orderService = require("../service/orderService");

exports.createOrder = async (req, res) => {
  try {
    const result = await orderService.createOrder(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};