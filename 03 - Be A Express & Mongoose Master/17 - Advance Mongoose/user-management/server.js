const express = require("express");
const User = require("./models/User");
const { userValidationSchema } = require("./validators/userValidator");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Failed:", err));

app.post("/users", async (req, res) => {
  try {
    const validatedData = userValidationSchema.parse(req.body);
    const newUser = await User.create(validatedData);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.errors) {
      return res.status(400).json({
        status: "fail",
        errors: error.errors.map((e) => ({
          path: e.path[0],
          message: e.message,
        })),
      });
    }
    res.status(500).json({ message: "Server Error", error });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
