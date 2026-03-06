const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API de gerenciamento de pedidos
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar um novo pedido
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
 *         description: Pedido criado com sucesso
 */
router.post("/order", orderController.createOrder);

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/order/list", orderController.listOrders);

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Buscar um pedido pelo ID
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
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/order/:orderId", orderController.getOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Atualizar um pedido
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
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
router.put("/order/:orderId", orderController.updateOrder);

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Deletar um pedido
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
 *         description: Pedido deletado
 *       404:
 *         description: Pedido não encontrado
 */
router.delete("/order/:orderId", orderController.deleteOrder);

module.exports = router;