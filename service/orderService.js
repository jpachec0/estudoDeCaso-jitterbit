const db = require("../config/db");

/**
 * Cria um pedido e seus itens.
 * Utiliza transação para garantir consistência dos dados.
 */
exports.createOrder = async (data) => {

  const order = {
    orderId: data.numeroPedido,
    value: data.valorTotal,
    creationDate: data.dataCriacao
  };

  const items = data.items.map(item => ({
    orderId: data.numeroPedido,
    productId: item.idItem,
    quantity: item.quantidadeItem,
    price: item.valorItem
  }));

  const conn = await db.getConnection();

  try {

    // Inicia transação
    await conn.beginTransaction();

    await conn.query(
      "INSERT INTO orders (orderId, value, creationDate) VALUES (?, ?, ?)",
      [order.orderId, order.value, order.creationDate]
    );

    for (const item of items) {
      await conn.query(
        "INSERT INTO items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
        [item.orderId, item.productId, item.quantity, item.price]
      );
    }

    // Confirma transação
    await conn.commit();

    return { message: "Order created successfully" };

  } catch (error) {

    // Desfaz transação em caso de erro
    await conn.rollback();
    throw error;

  } finally {

    conn.release();

  }

};

/**
 * Retorna um pedido com seus itens.
 */
exports.getOrder = async (orderId) => {

  const [orders] = await db.query(
    "SELECT * FROM orders WHERE orderId = ?",
    [orderId]
  );

  if (orders.length === 0) {
    return null;
  }

  const order = orders[0];

  const [items] = await db.query(
    "SELECT productId, quantity, price FROM items WHERE orderId = ?",
    [orderId]
  );

  return {
    numeroPedido: order.orderId,
    valorTotal: order.value,
    dataCriacao: order.creationDate,
    items: items.map(item => ({
      idItem: item.productId,
      quantidadeItem: item.quantity,
      valorItem: item.price
    }))
  };

};

/**
 * Lista todos os pedidos com seus itens.
 */
exports.listOrders = async () => {

  const [orders] = await db.query("SELECT * FROM orders");

  const result = [];

  for (const order of orders) {

    const [items] = await db.query(
      "SELECT productId, quantity, price FROM items WHERE orderId = ?",
      [order.orderId]
    );

    result.push({
      numeroPedido: order.orderId,
      valorTotal: order.value,
      dataCriacao: order.creationDate,
      items: items.map(item => ({
        idItem: item.productId,
        quantidadeItem: item.quantity,
        valorItem: item.price
      }))
    });

  }

  return result;
};

/**
 * Atualiza os dados de um pedido e recria seus itens.
 */
exports.updateOrder = async (orderId, data) => {

  const [existing] = await db.query(
    "SELECT orderId FROM orders WHERE orderId = ?",
    [orderId]
  );

  if (existing.length === 0) {
    return false;
  }

  await db.query(
    "UPDATE orders SET value = ?, creationDate = ? WHERE orderId = ?",
    [data.valorTotal, data.dataCriacao, orderId]
  );

  await db.query("DELETE FROM items WHERE orderId = ?", [orderId]);

  for (const item of data.items) {
    await db.query(
      "INSERT INTO items (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)",
      [orderId, item.idItem, item.quantidadeItem, item.valorItem]
    );
  }

  return true;
};

/**
 * Remove um pedido e seus itens associados.
 */
exports.deleteOrder = async (orderId) => {

  await db.query("DELETE FROM items WHERE orderId = ?", [orderId]);

  const [result] = await db.query(
    "DELETE FROM orders WHERE orderId = ?",
    [orderId]
  );

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
};