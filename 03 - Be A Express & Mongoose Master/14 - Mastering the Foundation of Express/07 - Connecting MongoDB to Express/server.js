require('dotenv').config({ path: '.env.local' });
const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoutes = require('./routes/users');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection String
const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ocfec5j.mongodb.net/?appName=Cluster0`;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic routes
app.get("/", (req, res) => {
  res.send("MongoDB + Express connection successful!");
});

// User routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
