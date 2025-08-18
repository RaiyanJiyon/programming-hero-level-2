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
                        id: Date.now().toString(),
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

        // ✅ PATCH /todos/:id → Update (rename) a todo
    } else if (req.url.startsWith("/todos/") && req.method === "PATCH") {
        const id = req.url.split("/")[2]; // Extract ID from URL
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

                    // Update the task
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
        const id = req.url.split("/")[2]; // Extract ID from URL
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