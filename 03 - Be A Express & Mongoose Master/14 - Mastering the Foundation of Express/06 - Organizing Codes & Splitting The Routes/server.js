const express = require("express");
const app = express();
const port = 3000;

// Importing routes
const routes = require("./routes/index");

// Middleware to parse JSON bodies
app.use(express.json());

// using routes
app.use('/', routes)

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Sorry, we couldn't find that!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
