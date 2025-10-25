When your app grows beyond a few routes, it becomes messy to keep all the code inside one file (`server.js` or `app.js`).
That’s where **route organization** and **splitting routes into separate files** come in.

Let’s go step-by-step 👇

---

## 🧱 Why Organize & Split Routes?

When your Express app is small, you can write all routes like this:

```js
app.get('/', ...);
app.get('/users', ...);
app.post('/products', ...);
```

But as your project grows, this becomes **hard to maintain**.

So we **separate (modularize)** routes by:

* Feature (e.g., `users`, `products`, `orders`)
* Purpose (e.g., `api`, `auth`, `admin`)

This makes your project:
✅ Easier to maintain
✅ Cleaner and readable
✅ Reusable for teams and large projects

---

## 📁 Example Project Structure

Here’s how a well-organized Express app might look:

```
my-express-app/
│
├── server.js
├── package.json
│
├── routes/
│   ├── users.js
│   ├── products.js
│   └── index.js
│
└── controllers/
    ├── userController.js
    └── productController.js
```

---

## ⚙️ Step 1: Basic Setup (server.js)

In your main `server.js`, you initialize Express and import routes.

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Import route files
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');

// Use JSON parser middleware
app.use(express.json());

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to My Express App!');
});

// 404 route (catch-all)
app.use((req, res) => {
  res.status(404).send('404 - Route Not Found');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## 🧩 Step 2: Create Routes Folder

### 📄 routes/users.js

```js
const express = require('express');
const router = express.Router();

// Example: GET all users
router.get('/', (req, res) => {
  res.send('Get all users');
});

// Example: GET user by ID
router.get('/:id', (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
});

// Example: POST create new user
router.post('/', (req, res) => {
  res.send('New user created');
});

module.exports = router;
```

---

### 📄 routes/products.js

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('List of all products');
});

router.get('/:id', (req, res) => {
  res.send(`Details of product ${req.params.id}`);
});

module.exports = router;
```

---

## 🧠 Step 3: Optional — Add Controllers

To make your routes even cleaner, you can move the logic into **controller files**.

### 📄 controllers/userController.js

```js
exports.getAllUsers = (req, res) => {
  res.send('Get all users (from controller)');
};

exports.getUserById = (req, res) => {
  res.send(`Get user with ID: ${req.params.id}`);
};
```

Then your `routes/users.js` becomes simpler:

```js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

module.exports = router;
```

Now each file has a **single responsibility**:

* `server.js` → sets up the server
* `routes/` → defines URLs
* `controllers/` → defines what each route does

---

## 🧠 Step 4: Optional — Group Routes

If you have many routers, you can combine them in an `index.js` inside `routes/`:

### 📄 routes/index.js

```js
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router;
```

Then in `server.js`, you just import one file:

```js
const routes = require('./routes');
app.use('/', routes);
```

---

## 🧾 Summary

| Concept            | Description                                   | Example                                 |
| ------------------ | --------------------------------------------- | --------------------------------------- |
| **Router**         | Mini Express app that handles specific routes | `express.Router()`                      |
| **Controller**     | Functions that handle route logic             | `userController.getAllUsers()`          |
| **Modular Routes** | Each route file handles one feature           | `routes/users.js`, `routes/products.js` |
| **Cleaner Code**   | Keeps main server file organized              | Only imports routers                    |

---

## 💡 Real-Life Analogy

Think of your Express app like a **shopping mall**:

* The **main server (`server.js`)** is the building.
* Each **route file** (like `/users`, `/products`) is a **shop**.
* Each **controller** is the **shopkeeper** who handles what happens inside.
