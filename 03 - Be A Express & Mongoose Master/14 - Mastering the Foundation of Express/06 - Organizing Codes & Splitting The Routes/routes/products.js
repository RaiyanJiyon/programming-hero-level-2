const express = require("express");
const route = express.Router();

// Sample product data
const products = [
  { id: 1, name: "iPhone" },
  { id: 2, name: "Samsung" },
];

// GET /products - Retrieve all products
route.get("/", (req, res) => {
  res.send(products);
});

// GET /products/:id - Retrieve a product by ID
route.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("Product not found");
  }
});

// POST /products - Create a new product
route.post("/", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req?.body?.name,
  };
  products.push(newProduct);
  res.status(201).send(newProduct);
});

module.exports = route;
