Connecting **MongoDB** to **Express.js** lets your app store, update, and retrieve real data — like users, products, messages, etc.

Let’s go through this step by step 👇

---

## 🧠 What You’ll Learn

By the end, you’ll know how to:

* Connect MongoDB to an Express app
* Use **Mongoose** (a popular ODM)
* Perform basic database operations

---

## ⚙️ Step 1: Install MongoDB & Mongoose

First, make sure you have:

* **Node.js** installed
* **MongoDB Atlas** (cloud) or local MongoDB installed

Then, install the necessary packages in your Express project:

```bash
npm install mongoose
```

> 💡 **Mongoose** is a library that makes it easier to work with MongoDB in Node.js.
> It lets you define schemas and models for structured data handling.

---

## 🌐 Step 2: Set Up MongoDB (Atlas or Local)

### 🟢 Option 1: MongoDB Atlas (Cloud)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free account and a cluster
3. Click “Connect” → Choose “Connect your application”
4. Copy your connection string (it will look like this):

```
mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase
```

> Replace `<username>` and `<password>` with your MongoDB credentials.

---

### ⚙️ Step 3: Connect Express to MongoDB

In your main `server.js` (or `app.js`):

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MongoDB Connection String
const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase';

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('MongoDB + Express connection successful!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

✅ If successful, you’ll see:

```
✅ Connected to MongoDB
Server running at http://localhost:3000
```

---

## 🧩 Step 4: Create a Mongoose Model

Let’s create a simple model for **users**.

### 📄 models/User.js

```js
const mongoose = require('mongoose');

// Define a Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create and export the model
module.exports = mongoose.model('User', userSchema);
```

---

## 🧠 Step 5: Use the Model in Your Routes

### 📄 routes/users.js

```js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE: Add a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ: Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ: Get a single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE: Update a user
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

---

## 🧩 Step 6: Register Routes in `server.js`

```js
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);
```

Now your API endpoints are:

| Method   | Endpoint     | Description    |
| -------- | ------------ | -------------- |
| `POST`   | `/users`     | Add new user   |
| `GET`    | `/users`     | Get all users  |
| `GET`    | `/users/:id` | Get user by ID |
| `PUT`    | `/users/:id` | Update user    |
| `DELETE` | `/users/:id` | Delete user    |

---

## 🧠 Step 7: Test the API

Use **Postman**, **Thunder Client (VS Code)**, or **curl** to test endpoints.

### Example POST Request:

**URL:** `http://localhost:3000/users`
**Body (JSON):**

```json
{
  "name": "Raiyan",
  "email": "raiyan@example.com",
  "age": 21
}
```

✅ Response:

```json
{
  "_id": "6717f3e5b91d9c100ab12345",
  "name": "Raiyan",
  "email": "raiyan@example.com",
  "age": 21,
  "__v": 0
}
```

---

## 🧾 Summary

| Step | Description                     |
| ---- | ------------------------------- |
| 1️⃣  | Install Mongoose                |
| 2️⃣  | Set up MongoDB (local or Atlas) |
| 3️⃣  | Connect to MongoDB              |
| 4️⃣  | Create Schema & Model           |
| 5️⃣  | Build CRUD Routes               |
| 6️⃣  | Register Routes in Express      |
| 7️⃣  | Test API with Postman           |

---

## 💡 Bonus Tips

* Use **environment variables** for your DB password (e.g., via `.env` and `dotenv`).
* Add **error handling middleware** for cleaner responses.
* Separate **routes**, **controllers**, and **models** for scalability.
