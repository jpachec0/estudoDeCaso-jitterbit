const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.post("/order", orderController.createOrder);
router.get("/order/list", orderController.listOrders);
router.get("/order/:orderId", orderController.getOrder);
router.put("/order/:orderId", orderController.updateOrder);


module.exports = router;