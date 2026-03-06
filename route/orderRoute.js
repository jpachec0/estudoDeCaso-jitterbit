const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

/**
 * Rotas responsáveis pelo gerenciamento de pedidos.
 * A documentação detalhada das rotas é feita via Swagger.
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management API
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: v10089016vdb
 *               valorTotal:
 *                 type: number
 *                 example: 100
 *               dataCriacao:
 *                 type: string
 *                 example: 2026-03-06
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: integer
 *                       example: 1
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 2
 *                     valorItem:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post("/order", orderController.createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get("/order/list", orderController.listOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/order/:orderId", orderController.getOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *                 example: 2026-03-06
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: integer
 *                     quantidadeItem:
 *                       type: integer
 *                     valorItem:
 *                       type: number
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/order/:orderId", orderController.updateOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/order/:orderId", orderController.deleteOrder);

module.exports = router;