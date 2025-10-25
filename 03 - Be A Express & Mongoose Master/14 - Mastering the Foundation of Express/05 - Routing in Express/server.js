const express = require("express");
const app = express();
const port = 3000;

//middleware to parse JSON bodies
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// About route
app.get("/about", (req, res) => {
  res.send("This is the About Page.");
});

// User profile route with dynamic parameter
app.get("/user/:username", (req, res) => {
  const username = req.params.username;
  res.send(`Welcome to ${username}'s profile!`);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
