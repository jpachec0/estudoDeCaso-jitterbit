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