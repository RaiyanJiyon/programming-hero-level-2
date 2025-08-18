# 📝 Build a Full-Featured TODO App with Node.js (No Express)

Nice choice 🚀 — let’s build a **complete TODO app** using only **Node.js core modules** (`http`, `fs`, `path`) — no Express, no databases.

This will help you:
- Understand how **real APIs** work under the hood
- Learn **file-based data persistence**
- Master **CRUD operations** (Create, Read, Update, Delete)
- Handle **asynchronous file operations**

---

## ✅ What We’ll Build

A **fully persistent TODO API** that:
- Stores todos in a `todos.json` file (survives server restarts ✅)
- Supports full **CRUD** via HTTP:
  - `GET /todos` → Get all todos
  - `POST /todos` → Add a new todo
  - `PATCH /todos/:id` → Update (rename) a todo
  - `DELETE /todos/:id` → Delete a todo

All using **only built-in Node.js modules**.

---

## 📌 Step 1: Project Setup

### 1. Create the project folder
```sh
mkdir todo-app
cd todo-app
```

### 2. Initialize npm (optional, for UUID later)
```sh
npm init -y
```

> 💡 You don’t need `npm` for this version (we use `Date.now()` for IDs), but you can add `uuid` later!

---

## 📌 Step 2: Create `server.js`

```js
const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 3000;
const hostname = "127.0.0.1";

// Path to todos.json
const TODO_FILE = path.join(__dirname, "todos.json");

// Create todos.json if it doesn't exist
if (!fs.existsSync(TODO_FILE)) {
  fs.writeFileSync(TODO_FILE, "[]", "utf-8");
}

// Helper: Read todos from file
function readTodos(callback) {
  fs.readFile(TODO_FILE, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      return callback([]);
    }
    try {
      const todos = JSON.parse(data);
      callback(todos);
    } catch (parseError) {
      console.error("Invalid JSON in file", parseError);
      callback([]);
    }
  });
}

// Helper: Write todos to file
function writeTodos(todos, callback) {
  fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 2), (err) => {
    if (err) console.error("Failed to save todos:", err);
    if (callback) callback();
  });
}

// Helper: Send JSON response
function sendJSON(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer((req, res) => {
  // ✅ Handle CORS (for Postman/frontend)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight (browser sends this before PATCH/DELETE)
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  // ✅ GET /todos → Return all todos
  if (req.url === "/todos" && req.method === "GET") {
    readTodos((todos) => {
      sendJSON(res, 200, todos);
    });

  // ✅ POST /todos → Add a new todo
  } else if (req.url === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const { task } = JSON.parse(body);
        if (!task || task.trim() === "") {
          return sendJSON(res, 400, { error: "Task is required" });
        }

        readTodos((todos) => {
          const newTodo = {
            id: Date.now().toString(), // Simple unique ID
            task: task.trim(),
            completed: false
          };
          todos.push(newTodo);
          writeTodos(todos, () => {
            sendJSON(res, 201, newTodo);
          });
        });
      } catch (err) {
        sendJSON(res, 400, { error: "Invalid JSON" });
      }
    });

  // ✅ PATCH /todos/:id → Update a todo
  } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
    const id = req.url.split("/")[2];
    if (!id) {
      return sendJSON(res, 400, { error: "Todo ID is required" });
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const { task } = JSON.parse(body);
        if (!task || task.trim() === "") {
          return sendJSON(res, 400, { error: "Task is required" });
        }

        readTodos((todos) => {
          const todo = todos.find(t => t.id === id);
          if (!todo) {
            return sendJSON(res, 404, { error: "Todo not found" });
          }

          todo.task = task.trim();
          writeTodos(todos, () => {
            sendJSON(res, 200, todo);
          });
        });
      } catch (err) {
        sendJSON(res, 400, { error: "Invalid JSON" });
      }
    });

  // ✅ DELETE /todos/:id → Delete a todo
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = req.url.split("/")[2];
    if (!id) {
      return sendJSON(res, 400, { error: "Todo ID is required" });
    }

    readTodos((todos) => {
      const filtered = todos.filter(t => t.id !== id);
      if (filtered.length === todos.length) {
        return sendJSON(res, 404, { error: "Todo not found" });
      }

      writeTodos(filtered, () => {
        sendJSON(res, 200, { message: "Todo deleted", id });
      });
    });

  // ❌ 404 - Route not found
  } else {
    sendJSON(res, 404, { error: "Route not found. Try GET/POST/PATCH/DELETE /todos" });
  }
});

// 🚀 Start server
server.listen(port, hostname, () => {
  console.log(`✅ Server running at http://${hostname}:${port}`);
  console.log(`📄 Todos stored in: ${TODO_FILE}`);
});
```

---

## 📌 Step 3: Run the Server

```sh
node server.js
```

You’ll see:
```
✅ Server running at http://127.0.0.1:3000
📄 Todos stored in: /your-path/todos.json
```

> 💡 A `todos.json` file will be created automatically if it doesn’t exist.

---

## 📌 Step 4: Test the API

Use **curl**, **Postman**, or **Thunder Client (VS Code)**.

### 🟢 GET: Get all todos

```sh
curl http://localhost:3000/todos
```

👉 Returns:
```json
[]
```

---

### ➕ POST: Add a new todo

```sh
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"task": "Learn Node.js"}'
```

👉 Returns:
```json
{
  "id": "1717000000000",
  "task": "Learn Node.js",
  "completed": false
}
```

Check `todos.json` — it’s saved! ✅

---

### 🔁 PATCH: Update a todo (rename)

Replace `1717000000000` with the actual ID from your POST response.

```sh
curl -X PATCH http://localhost:3000/todos/1717000000000 \
  -H "Content-Type: application/json" \
  -d '{"task": "Master Node.js"}'
```

👉 Returns:
```json
{
  "id": "1717000000000",
  "task": "Master Node.js",
  "completed": false
}
```

---

### 🗑️ DELETE: Delete a todo

```sh
curl -X DELETE http://localhost:3000/todos/1717000000000
```

👉 Returns:
```json
{ "message": "Todo deleted", "id": "1717000000000" }
```

Open `todos.json` — the todo is gone! ✅

---

## ✅ What You Learned

| Skill | Why It Matters |
|------|----------------|
| `http.createServer()` | How Node.js handles HTTP requests manually |
| `fs.readFile` / `fs.writeFile` | How to read/write files with persistence |
| `JSON.parse` & `JSON.stringify` | How to convert between text and data |
| `req.on("data")` and `req.on("end")` | How to handle streaming request bodies |
| `path.join()` and `__dirname` | Safe file path handling across OS |
| `JSON.stringify(data, null, 2)` | Pretty-print JSON for readable files |
| URL parsing with `split("/")` | How to extract dynamic IDs from routes |
| CORS & preflight handling | Real-world readiness for frontend apps |

---

## 🚀 Next Steps (Optional)

Want to go further? I can help you:

1. **Add UUID for better IDs**  
   ```bash
   npm install uuid
   ```
   Then: `const { v4: uuidv4 } = require("uuid");`

2. **Add a frontend (HTML + JS)**  
   So you can interact with the app in the browser visually.

3. **Add “toggle completed” feature**  
   With `PATCH /todos/:id` to mark as done/undone.

4. **Add error logging to a file**  
   So errors aren’t just printed to console.

5. **Upgrade to Express.js**  
   See how much cleaner it becomes with a framework.

