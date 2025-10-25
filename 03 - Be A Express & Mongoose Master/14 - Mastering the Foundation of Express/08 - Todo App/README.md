## 🧩 Project Overview

We’ll build a simple **RESTful API** for managing TODO items.
Each TODO will have:

* `title` → string
* `completed` → boolean

We’ll use:

* **Node.js + Express.js** — for the backend server
* **MongoDB + Mongoose** — for the database

---

## 📁 Folder Structure

```
todo-app/
│
├── server.js
├── package.json
│
├── models/
│   └── Todo.js
│
└── routes/
    └── todos.js
```

---

## ⚙️ Step 1: Initialize Project

Open terminal:

```bash
mkdir todo-app
cd todo-app
npm init -y
npm install express mongoose
```

---

## ⚙️ Step 2: Create the Server (`server.js`)

```js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo_db')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ DB connection error:', err));

// Import routes
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to the TODO App API!');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
```

> 💡 If using MongoDB Atlas, replace the local URL with your Atlas connection string.

---

## 📘 Step 3: Create a Model (`models/Todo.js`)

```js
const mongoose = require('mongoose');

// Define Todo Schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Create and export model
module.exports = mongoose.model('Todo', todoSchema);
```

---

## 📘 Step 4: Create Routes (`routes/todos.js`)

```js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// ✅ CREATE a new TODO
router.post('/', async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      completed: req.body.completed || false
    });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 📋 READ all TODOs
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔍 READ a TODO by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✏️ UPDATE a TODO
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🗑️ DELETE a TODO
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

---

## ▶️ Step 5: Run the Server

Start the server:

```bash
node server.js
```

Output:

```
✅ MongoDB Connected
🚀 Server running on http://localhost:3000
```

---

## 🧪 Step 6: Test API Endpoints (using Postman or Thunder Client)

### 🟢 Create TODO

**POST** → `http://localhost:3000/api/todos`
**Body (JSON):**

```json
{
  "title": "Learn Express.js"
}
```

Response:

```json
{
  "_id": "6718c4a5b10f5e111234abcd",
  "title": "Learn Express.js",
  "completed": false,
  "createdAt": "2025-10-22T10:00:00.000Z",
  "updatedAt": "2025-10-22T10:00:00.000Z"
}
```

---

### 📋 Get All TODOs

**GET** → `http://localhost:3000/api/todos`

Response:

```json
[
  {
    "_id": "6718c4a5b10f5e111234abcd",
    "title": "Learn Express.js",
    "completed": false
  }
]
```

---

### ✏️ Update a TODO

**PUT** → `http://localhost:3000/api/todos/6718c4a5b10f5e111234abcd`
**Body (JSON):**

```json
{
  "completed": true
}
```

Response:

```json
{
  "_id": "6718c4a5b10f5e111234abcd",
  "title": "Learn Express.js",
  "completed": true
}
```

---

### 🗑️ Delete a TODO

**DELETE** → `http://localhost:3000/api/todos/6718c4a5b10f5e111234abcd`

Response:

```json
{ "message": "Todo deleted successfully" }
```

---

## 🧠 Bonus Improvements

You can add:

* ✅ Validation using `Joi` or `express-validator`
* ✅ Authentication (e.g., JWT for user login)
* ✅ Frontend with React/Vue to interact with the API
* ✅ `.env` for database credentials

---

## 🧾 Summary

| Feature  | Route            | Method | Description       |
| -------- | ---------------- | ------ | ----------------- |
| Create   | `/api/todos`     | POST   | Add new TODO      |
| Read All | `/api/todos`     | GET    | Get all TODOs     |
| Read One | `/api/todos/:id` | GET    | Get specific TODO |
| Update   | `/api/todos/:id` | PUT    | Edit TODO         |
| Delete   | `/api/todos/:id` | DELETE | Remove TODO       |
