## 🧩 1. What Are Route Parameters (Params)?

### 🧠 Definition:

**Params** (short for *route parameters*) are **part of the URL path**.
They’re used to identify a **specific resource** or piece of data on the server.

Example URL:

```
/users/10
```

Here, `10` could be the ID of a specific user.

---

### ⚙️ How It Works in Express

You define a **parameter** in your route by using a colon `:` before the name:

```js
app.get('/users/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`);
});
```

If you visit:

```
http://localhost:3000/users/10
```

You’ll get:

```
User ID is 10
```

---

### 💡 You Can Have Multiple Params

```js
app.get('/users/:userId/books/:bookId', (req, res) => {
  const { userId, bookId } = req.params;
  res.send(`User ID: ${userId}, Book ID: ${bookId}`);
});
```

Visit:

```
http://localhost:3000/users/5/books/101
```

Response:

```
User ID: 5, Book ID: 101
```

---

### 📦 Summary of Params

| Feature           | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| Location          | Inside the **URL path**                                              |
| Format            | `/route/:paramName`                                                  |
| Access in Express | `req.params.paramName`                                               |
| Example           | `/users/:id → req.params.id`                                         |
| Use Case          | Identifying a **specific resource** (e.g., a user, product, or post) |

---

## 🌐 2. What Are Query Strings (Queries)?

### 🧠 Definition:

**Query strings** (or **queries**) are **key-value pairs** that come **after a “?”** in the URL.
They’re typically used to **filter, sort, or search** for data — not to identify it.

Example URL:

```
/search?name=Raiyan&age=20
```

Here:

* `name` = `"Raiyan"`
* `age` = `20`

---

### ⚙️ How It Works in Express

```js
app.get('/search', (req, res) => {
  const { name, age } = req.query;
  res.send(`Searching for ${name}, Age ${age}`);
});
```

Visit:

```
http://localhost:3000/search?name=Raiyan&age=20
```

Response:

```
Searching for Raiyan, Age 20
```

---

### 💡 Multiple Queries Are Supported

Queries are separated by `&`, for example:

```
/products?category=phones&sort=price&order=asc
```

You can access them in Express with:

```js
req.query.category   // "phones"
req.query.sort       // "price"
req.query.order      // "asc"
```

---

### 📦 Summary of Queries

| Feature           | Description                                                  |
| ----------------- | ------------------------------------------------------------ |
| Location          | After the **?** in the URL                                   |
| Format            | `/route?key=value`                                           |
| Access in Express | `req.query.key`                                              |
| Example           | `/search?name=Raiyan → req.query.name`                       |
| Use Case          | **Filtering**, **searching**, **sorting**, or **pagination** |

---

## ⚖️ Params vs Queries: Key Differences

| Feature               | Params (`req.params`)         | Queries (`req.query`)                       |
| --------------------- | ----------------------------- | ------------------------------------------- |
| **Location**          | Part of the URL path          | After `?` in the URL                        |
| **Example URL**       | `/users/10`                   | `/users?name=Raiyan`                        |
| **Purpose**           | Identify a specific resource  | Filter or modify the request                |
| **Access in Express** | `req.params.id`               | `req.query.name`                            |
| **Typical Use**       | Get user by ID (`/users/:id`) | Search users by name (`/users?name=Raiyan`) |

---

## 🧠 Example: Using Both Together

```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { sort } = req.query;
  res.send(`User ID: ${userId}, Sort: ${sort}`);
});
```

If you visit:

```
http://localhost:3000/users/10?sort=asc
```

Response:

```
User ID: 10, Sort: asc
```

---

### 🧾 Quick Analogy

Imagine a **library**:

* **Params** → Tell you *which book* you want (e.g., `/books/123`)
* **Queries** → Tell you *how* you want it (e.g., `/books/123?format=pdf` or `/books?author=Rowling&sort=year`)

---

### ✅ Summary

| Concept     | Example URL              | Access in Express | Common Use             |
| ----------- | ------------------------ | ----------------- | ---------------------- |
| **Params**  | `/users/:id → /users/10` | `req.params.id`   | Identify specific item |
| **Queries** | `/search?name=Raiyan`    | `req.query.name`  | Filter or modify data  |

