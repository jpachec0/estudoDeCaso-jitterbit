# Jitterbit - Order API

API simples em Node.js + Express + MySQL para gerenciamento de pedidos.

## Requisitos

* Node.js
* MySQL
* npm

## Instalação

1. Clone o projeto

```
git clone <repo>
cd estudodecaso-jitterbit
```

2. Instale as dependências

```
npm install
```

3. Configure o banco de dados no arquivo:

```
config/db.js
```

## Banco de Dados

Criar o banco:

```
CREATE DATABASE jitterbit;
```

Criar as tabelas:

```
CREATE TABLE orders (
  orderId VARCHAR(50) PRIMARY KEY,
  value DECIMAL(10,2),
  creationDate DATE
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(50),
  productId INT,
  quantity INT,
  price DECIMAL(10,2),
  FOREIGN KEY (orderId) REFERENCES orders(orderId)
);
```

## Executar o projeto

```
node app.js
```

Servidor roda em:

```
http://localhost:3000
```

## Endpoints

### Criar pedido

POST

```
/order
```

Body:

```
{
  "numeroPedido": "v10089016vdb",
  "valorTotal": 100,
  "dataCriacao": "2026-03-06",
  "items": [
    {
      "idItem": 1,
      "quantidadeItem": 2,
      "valorItem": 50
    }
  ]
}
```

---

### Buscar pedido

GET

```
/order/:orderId
```

Exemplo:

```
/order/v10089016vdb
```

---

### Listar pedidos

GET

```
/order/list
```

---

### Atualizar pedido

PUT

```
/order/:orderId
```

---

### Deletar pedido

DELETE

```
/order/:orderId
```

---

## Tecnologias

* Node.js
* Express
* MySQL
