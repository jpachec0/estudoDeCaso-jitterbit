const db = require("../config/db");

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

    await conn.commit();

    return { message: "Order created successfully" };

  } catch (error) {

    await conn.rollback();
    throw error;

  } finally {

    conn.release();

  }

  

};

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

