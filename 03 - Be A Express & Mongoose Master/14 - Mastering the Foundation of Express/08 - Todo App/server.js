require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todo');
const app = express();
const PORT = 3000;

//  Middleware
app.use(express.json());

// MongoDB Connection String
const mongoUri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ocfec5j.mongodb.net/todoApp`;

// Connect to MongoDB with updated options
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


//  Import routes

app.use('/todos', todoRoutes)

// Home route
app.get('/', (req, res) => {
    res.send("TODO Application");
});

//  Handling mismatched routes error
app.use((req, res) => {
    res.send("No routes found.")
});

app.listen(PORT, () => {
    console.log("Server is running of port: ",PORT);   
});