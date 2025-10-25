## 🧠 What is Middleware?

In **Express.js**, **middleware** are functions that sit **between** the request (from the client) and the response (from the server).

They can:

* Examine or modify the **request** (`req`)
* Modify or prepare the **response** (`res`)
* Decide whether to **pass control** to the next middleware or **end the response**

---

### 🔁 Middleware Flow Diagram

```
Client ---> Middleware 1 ---> Middleware 2 ---> Route Handler ---> Response
```

Each middleware can:

* Do something
* Then call `next()` to move on
* Or send a response and stop the chain

---

## ⚙️ Basic Example

```js
const express = require('express');
const app = express();

// Middleware function
const myLogger = (req, res, next) => {
  console.log(`🕒 ${req.method} ${req.url}`);
  next(); // pass control to next handler
};

// Use the middleware
app.use(myLogger);

app.get('/', (req, res) => {
  res.send('Hello Middleware!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### 🧩 Output Example:

If you open `http://localhost:3000/`, you’ll see in the terminal:

```
🕒 GET /
```

---

## 🧩 How Middleware Works Internally

Every time a request hits your server, Express runs through a **stack of middleware functions** in order.

A middleware has the form:

```js
(req, res, next) => { ... }
```

### Possible actions:

| Action                      | Meaning                                     |
| --------------------------- | ------------------------------------------- |
| `next()`                    | Pass to the next middleware                 |
| `res.send()`                | End the response                            |
| `res.status(...).json(...)` | Send a response and stop further middleware |
| Throw error                 | Triggers Express error handler              |

---

## 🧱 Types of Middleware

### 1️⃣ **Application-Level Middleware**

Used globally with `app.use()`.

```js
app.use((req, res, next) => {
  console.log('This runs for every request!');
  next();
});
```

---

### 2️⃣ **Route-Level Middleware**

Used for specific routes only.

```js
const checkAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === '12345') next();
  else res.status(401).send('Unauthorized');
};

app.get('/secret', checkAuth, (req, res) => {
  res.send('You are authorized!');
});
```

---

### 3️⃣ **Built-in Middleware**

Express comes with some built-in ones:

| Middleware                 | Purpose                                |
| -------------------------- | -------------------------------------- |
| `express.json()`           | Parses incoming JSON data              |
| `express.urlencoded()`     | Parses form data                       |
| `express.static('public')` | Serves static files like HTML, CSS, JS |

Example:

```js
app.use(express.json());
app.use(express.static('public'));
```

---

### 4️⃣ **Third-Party Middleware**

You can install external packages like:

| Package           | Purpose                               |
| ----------------- | ------------------------------------- |
| `morgan`          | Logs HTTP requests                    |
| `cors`            | Enables Cross-Origin Resource Sharing |
| `helmet`          | Adds security headers                 |
| `express-session` | Manages user sessions                 |

Example:

```js
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
```

---

## ⚠️ Error-Handling Middleware

A **special kind** of middleware with **4 parameters**:

```js
(err, req, res, next)
```

Example:

```js
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).send('Something broke!');
});
```

> You typically place this **after all routes**, so it catches any errors.

---

## 🔍 Real-Life Example (Middleware Chain)

```js
const express = require('express');
const app = express();

// 1. Logger
app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// 2. JSON parser
app.use(express.json());

// 3. Route handler
app.get('/', (req, res) => {
  res.send('Hello World');
});

// 4. Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('Server on 3000'));
```

---

## 🧾 Summary

| Type          | Example                 | Used For                  |
| ------------- | ----------------------- | ------------------------- |
| Application   | `app.use(fn)`           | Global logic              |
| Route-Level   | `app.get('/path', fn)`  | Specific routes           |
| Built-in      | `express.json()`        | JSON, static files, forms |
| Third-Party   | `cors()`, `morgan()`    | Extra features            |
| Error Handler | `(err, req, res, next)` | Handling errors           |

---

## 💡 Best Practices

✅ Always call `next()` when done
✅ Place error handlers **after** routes
✅ Use middleware for reusable logic (e.g., auth, logging, validation)
✅ Order matters — Express runs middleware **in the order they’re defined**
