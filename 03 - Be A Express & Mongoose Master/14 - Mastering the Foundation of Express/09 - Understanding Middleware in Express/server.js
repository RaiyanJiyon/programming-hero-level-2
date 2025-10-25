const express = require("express");
const app = express();
const port = 3000;

// Custom middleware function
const loggerMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const checkAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === "123455") next();
  else res.status(401).send("Unauthorized");
};

// Use the middleware in the app
app.use(loggerMiddleware);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/profile", checkAuthMiddleware, (req, res) => {
  res.send("This is the profile page.");
});

app.use((req, res, next) => {
  console.log("This runs for every request");
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
