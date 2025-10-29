const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const noteRoutes = require("./routes/noteRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/notes", noteRoutes);

app.get("/", (req, res) => {
  res.send("Note App");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ DB Connection Failed:", err.message));
