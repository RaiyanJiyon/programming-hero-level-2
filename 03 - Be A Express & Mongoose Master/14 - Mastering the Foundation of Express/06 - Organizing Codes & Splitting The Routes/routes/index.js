const express = require("express");
const route = express.Router();

route.use("/users", require("./users"));
route.use("/products", require("./products"));

module.exports = route;
