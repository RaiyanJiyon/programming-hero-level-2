## 🚦 What Is Routing in Express?

### 🧠 Definition:

**Routing** in Express.js refers to **defining how your server responds to client requests** for specific URLs (paths) and HTTP methods (like `GET`, `POST`, `PUT`, `DELETE`).

For example:

* `/home` → Show the homepage
* `/about` → Show the about page
* `/api/users` → Return user data

Each of these paths is called a **route**.

---

### ⚙️ Basic Route Syntax

```js
app.METHOD(PATH, HANDLER)
```

| Term      | Meaning                                                                |
| --------- | ---------------------------------------------------------------------- |
| `app`     | The Express application                                                |
| `METHOD`  | HTTP method like `get`, `post`, `put`, or `delete`                     |
| `PATH`    | URL endpoint (string or pattern)                                       |
| `HANDLER` | Function that runs when the route is matched (`(req, res) => { ... }`) |

---

### 💻 Example: Basic Routes

```js
const express = require('express');
const app = express();
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

// About route
app.get('/about', (req, res) => {
  res.send('This is the About Page.');
});

// Contact route
app.get('/contact', (req, res) => {
  res.send('Contact us at contact@example.com');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

🖥 Visit these in your browser:

* `http://localhost:3000/`
* `http://localhost:3000/about`
* `http://localhost:3000/contact`

---

## 📬 HTTP Methods in Routing

Express supports all standard HTTP methods.
Each method defines a **different type of action** for your routes.

| Method   | Description          | Example Use     |
| -------- | -------------------- | --------------- |
| `GET`    | Retrieve data        | Get a user list |
| `POST`   | Send or create data  | Add a new user  |
| `PUT`    | Update existing data | Edit a user     |
| `DELETE` | Remove data          | Delete a user   |

---

### 💻 Example: CRUD Routes for a User

```js
app.get('/users', (req, res) => {
  res.send('Get all users');
});

app.post('/users', (req, res) => {
  res.send('Create a new user');
});

app.put('/users/:id', (req, res) => {
  res.send(`Update user with ID ${req.params.id}`);
});

app.delete('/users/:id', (req, res) => {
  res.send(`Delete user with ID ${req.params.id}`);
});
```

---

## 🧩 Route Parameters

You can define **dynamic routes** using parameters with a colon `:`.

```js
app.get('/users/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

Visiting `http://localhost:3000/users/25` →
Response: `User ID: 25`

---

## 🔍 Query Parameters in Routes

You can also accept **queries** (after the `?` in the URL).

```js
app.get('/search', (req, res) => {
  const { name } = req.query;
  res.send(`Searching for user: ${name}`);
});
```

Visiting:

```
http://localhost:3000/search?name=Raiyan
```

→ `Searching for user: Raiyan`

---

## 🧱 Route Grouping (Router)

For larger apps, you can **organize routes** using the `express.Router()` class.
This keeps your code modular and clean.

### 💻 Example:

**users.js**

```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.send('All Users'));
router.get('/:id', (req, res) => res.send(`User ID: ${req.params.id}`));
router.post('/', (req, res) => res.send('User Created'));

module.exports = router;
```

**server.js**

```js
const express = require('express');
const app = express();
const userRoutes = require('./users');

app.use('/users', userRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
```

Now your routes work like:

* `GET /users` → All users
* `GET /users/:id` → One user
* `POST /users` → Create user

---

## ⚠️ Handling 404 (Not Found) Routes

Add this **catch-all route** at the bottom:

```js
app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});
```

---

## 🧾 Summary

| Concept         | Description                         | Example                                |
| --------------- | ----------------------------------- | -------------------------------------- |
| **Route**       | URL endpoint that handles a request | `/about`, `/api/users`                 |
| **HTTP Method** | Defines the action type             | `GET`, `POST`, `PUT`, `DELETE`         |
| **Params**      | Dynamic part of a route             | `/users/:id → req.params.id`           |
| **Query**       | Key-value pairs in URL              | `/search?name=Raiyan → req.query.name` |
| **Router**      | Helps group and organize routes     | `express.Router()`                     |

---

## 💡 Quick Analogy

Think of **routing** like a **reception desk**:

* Each route (`/about`, `/contact`, etc.) is like a **counter** that handles specific requests.
* When a visitor (client) asks for a specific service (URL), Express directs them to the correct handler.