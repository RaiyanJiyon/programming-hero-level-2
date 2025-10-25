const express = require("express");
const route = express.Router();

// Sample user data
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

// GET /users - Retrieve all users
route.get("/", (req, res) => {
  res.json(users);
});

// GET /users/:id - Retrieve a user by ID
route.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// POST /users - Create a new user
route.post("/", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = route;
