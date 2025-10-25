## 🧠 What Is Error Handling in Express?

Error handling means catching and responding to problems that occur:

* When a route doesn’t exist (→ 404)
* When something goes wrong inside your app (→ server or logic error)
* When a database or external API fails

Express provides tools to handle these gracefully — without crashing your app.

---

## 🧱 Step 1: Handle 404 (Not Found)

If no route matches the request, Express will reach the **end of the middleware chain**.
You can catch this by adding a custom middleware **after all routes**.

```js
// 404 Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});
```

🧩 Explanation:

* This middleware runs **only if** no route above it handled the request.
* You set a **404 status** and send a JSON response (or an HTML page if you prefer).

---

## ⚙️ Step 2: Add a Global Error Handler

When an error happens (like a thrown exception or a rejected promise), you can handle it in a **centralized place** using a **special middleware** with **4 parameters**:

```js
// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});
```

### 🔍 Middleware Signature

```js
(err, req, res, next)
```

| Parameter | Description                                                 |
| --------- | ----------------------------------------------------------- |
| `err`     | The error object passed by Express or thrown in code        |
| `req`     | The request object                                          |
| `res`     | The response object                                         |
| `next`    | Used to pass control to another error handler (rarely used) |

---

## ⚡ Step 3: Trigger Errors

You can manually throw or pass errors to the handler.

### Example 1: Throwing an error inside a route

```js
app.get('/error', (req, res) => {
  throw new Error('Something went wrong!');
});
```

### Example 2: Using `next(err)` for async code

```js
app.get('/async-error', async (req, res, next) => {
  try {
    // Simulating DB or API failure
    throw new Error('Database connection failed');
  } catch (err) {
    next(err); // Passes the error to the global handler
  }
});
```

---

## 🧩 Step 4: Full Example

Here’s a **complete setup** combining routes, 404, and global error handling:

```js
const express = require('express');
const app = express();

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Error Handling Demo!');
});

// Example route that throws error
app.get('/cause-error', (req, res, next) => {
  next(new Error('This is a test error.'));
});

// 404 Handler (MUST come after all routes)
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Global Error Handler (MUST come last)
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
```

---

## 🧾 Example Output

### When accessing `/cause-error`

```json
{
  "success": false,
  "message": "This is a test error."
}
```

### When accessing `/not-found-route`

```json
{
  "success": false,
  "message": "Route not found"
}
```

---

## 🧠 Error Handling in Async Routes (Best Practice)

When using **async/await**, you can wrap routes in a helper function to avoid repeating try/catch.

Example helper:

```js
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
```

Usage:

```js
app.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));
```

Now, if any error occurs, it will automatically go to your **global error handler**.

---

## 🛡️ Why Error Handling Matters

✅ Prevents server crashes
✅ Sends clear, consistent error responses
✅ Easier debugging
✅ Better security (don’t expose stack traces to users)
✅ Easier to maintain

---

## 🧩 Summary

| Type                 | Description            | Example                                   |
| -------------------- | ---------------------- | ----------------------------------------- |
| 404 Middleware       | Handles invalid routes | `app.use((req, res) => {...})`            |
| Global Error Handler | Handles runtime errors | `app.use((err, req, res, next) => {...})` |
| Manual Error         | Created in routes      | `next(new Error('Something bad'))`        |
| Async Error          | From async routes      | Wrapped with `asyncHandler(fn)`           |

